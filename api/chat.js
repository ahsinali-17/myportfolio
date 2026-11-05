import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { SystemMessage, HumanMessage, AIMessage } from "@langchain/core/messages";
import { Bio, skills, education, experience, projects, certifications } from "../src/data/Data.js";

// Keys live ONLY on the server now. No VITE_ prefix, so they never reach the browser.
const API_KEYS = [
  process.env.GEMINI_API_KEY_1,
  process.env.GEMINI_API_KEY_2,
];

let currentKeyIndex = 0;
let model = null;

const portfolioData = { Bio, skills, education, experience, projects, certifications };

const createSystemPrompt = () => `You are an AI assistant for ${
  portfolioData.Bio.name
}'s portfolio website. You should ONLY answer questions related to ${portfolioData.Bio.name}'s professional background, education, skills, projects, and work experience based on the following data:

PERSONAL INFO:
${JSON.stringify(portfolioData.Bio, null, 2)}

SKILLS:
${JSON.stringify(portfolioData.skills, null, 2)}

EDUCATION:
${JSON.stringify(portfolioData.education, null, 2)}

WORK EXPERIENCE:
${JSON.stringify(portfolioData.experience, null, 2)}

PROJECTS:
${JSON.stringify(portfolioData.projects, null, 2)}

CERTIFICATIONS: 
${JSON.stringify(portfolioData.certifications, null, 2)}

INSTRUCTIONS:
- Answer questions about ${portfolioData.Bio.name}'s background, skills, education, projects, and professional experience
- Be conversational and helpful
- If asked about topics unrelated to ${portfolioData.Bio.name}'s professional profile, politely decline and redirect to relevant topics
- Keep responses concise, to the point but informative.
- Give selective answers based on the data provided. Dont tell about the whole section if they ask about a specific part. For example, if you're asked, where i live, keep it to the point and say Wah cantt,Pakistan. Then ask if they want more information. Dont tell them about the time zone, it is not relevant. If you don't know the answer, say "I'm not sure about that."
- You can suggest related questions about his work or skills`;

const getModel = () => {
  if (!model) {
    const apiKey = API_KEYS[currentKeyIndex];
    if (!apiKey) {
      throw new Error(`Gemini API Key missing for index: ${currentKeyIndex}`);
    }
    model = new ChatGoogleGenerativeAI({
      apiKey: apiKey,
      model: "gemini-2.5-flash",
    });
  }
  return model;
};

const convertToLangchainMessages = (messages) => {
  if (!messages || !Array.isArray(messages)) return [];

  const mapped = messages.map((msg) => {
    const isUser = msg.sender === "user" || msg.role === "user";
    const text = msg.text || msg.content || String(msg);
    return isUser ? new HumanMessage(text) : new AIMessage(text);
  });

  return [new SystemMessage(createSystemPrompt()), ...mapped];
};

const rotateKeyAndRetry = async (langchainMessages) => {
  const startKeyIndex = currentKeyIndex;

  for (let i = 1; i < API_KEYS.length; i++) {
    currentKeyIndex = (startKeyIndex + i) % API_KEYS.length;
    model = null;

    try {
      const currentModel = getModel();
      const response = await currentModel.invoke(langchainMessages);
      return response.content;
    } catch (error) {
      const isQuotaError =
        error.status === 429 ||
        error.message?.includes("429") ||
        error.message?.includes("Quota");
      if (!isQuotaError) throw error;
    }
  }

  currentKeyIndex = startKeyIndex;
  model = null;
  throw new Error("All API keys have reached their quota limits.");
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const langchainMessages = convertToLangchainMessages(req.body.messages);

  try {
    const currentModel = getModel();
    const response = await currentModel.invoke(langchainMessages);
    return res.status(200).json({ reply: response.content });
  } catch (error) {
    const isQuotaError =
      error.status === 429 ||
      error.message?.includes("429") ||
      error.message?.includes("Quota");

    if (isQuotaError) {
      try {
        const reply = await rotateKeyAndRetry(langchainMessages);
        return res.status(200).json({ reply });
      } catch (retryError) {
        console.error("Retry failed:", retryError);
      }
    } else {
      console.error("Chat error:", error);
    }
    return res.status(500).json({ error: "Chat failed" });
  }
}
