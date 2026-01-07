import { GoogleGenerativeAI } from "@google/generative-ai";
import { Bio, skills, education, experience, projects } from "../data/Data.js";

const API_KEYS = [
  import.meta.env.VITE_GEMINI_API_KEY_1,
  import.meta.env.VITE_GEMINI_API_KEY_2,
];

let currentKeyIndex = 0;
let genAI = null;
let model = null;
let chatSession = null;

const portfolioData = { Bio, skills, education, experience, projects };

const createSystemPrompt = (data) => `You are an AI assistant for ${
  data.Bio.name
}'s portfolio website. You should ONLY answer questions related to Ahsin Ali's professional background, education, skills, projects, and work experience based on the following data:

PERSONAL INFO:
${JSON.stringify(data.Bio, null, 2)}

SKILLS:
${JSON.stringify(data.skills, null, 2)}

EDUCATION:
${JSON.stringify(data.education, null, 2)}

WORK EXPERIENCE:
${JSON.stringify(data.experience, null, 2)}

PROJECTS:
${JSON.stringify(data.projects, null, 2)}

INSTRUCTIONS:
- Answer questions about Ahsin Ali's background, skills, education, projects, and professional experience
- Be conversational and helpful
- If asked about topics unrelated to Ahsin's professional profile, politely decline and redirect to relevant topics
- Keep responses concise, to the point but informative.
- Give selective answers based on the data provided. Dont tell about the whole section if they ask about a specific part. For example, if you're asked, where i live, keep it to the point and say Wah cantt,Pakistan. Then ask if they want more information. Dont tell them about the time zone, it is not relevant. If you don't know the answer, say "I'm not sure about that."
- You can suggest related questions about his work or skills`;

// Helper to initialize the Model with the CURRENT key
const initializeModel = () => {
  const apiKey = API_KEYS[currentKeyIndex];
  if (!apiKey)
    console.warn("Gemini API Key missing for index:", currentKeyIndex);

  genAI = new GoogleGenerativeAI(apiKey);
  model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: createSystemPrompt(portfolioData),
  });
};

// Initialize or Restore Chat Session
const initializeChatSession = async (history = null) => {
  if (!model) initializeModel();

  // If history is provided, use it (Restore Logic)
  if (history) {
    chatSession = model.startChat({ history });
    return chatSession;
  }

  // Otherwise, start fresh if not exists
  if (!chatSession) {
    chatSession = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "Hello! I'd like to know about Ahsin Ali." }],
        },
        {
          role: "model",
          parts: [
            {
              text: "Hi! I'm here to help you learn about Ahsin Ali's professional background, skills, education, and projects. What would you like to know?",
            },
          ],
        },
      ],
    });
  }
  return chatSession;
};

// Reset chat session
export const resetChatSession = async () => {
  chatSession = null;
  return await initializeChatSession();
};

// Restore chat session from history (Exported)
export const restoreChatSession = async (history) => {
  chatSession = null;
  return await initializeChatSession(history);
};

const rotateKeyAndRetry = async (question, previousHistory) => {
  console.log(
    `⚠️ Key ${currentKeyIndex + 1} exhausted or failed. Switching keys...`
  );

  // 1. Switch Key Index
  currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length;

  // 2. Re-initialize Model with new key
  initializeModel({ history });

  const result = await chatSession.sendMessage(question);
  return result.response.text();
};

export const askAboutMe = async (question) => {
  try {
    const chat = await initializeChatSession();
    const result = await chat.sendMessage(question);
    return result.response.text();
  } catch (error) {
    const isQuotaError =
      error.response?.status === 429 ||
      error.message?.includes("429") ||
      error.message?.includes("Quota");

    if (isQuotaError) {
      try {
        const currentHistory = await chatSession.getHistory();

        return await rotateKeyAndRetry(question, currentHistory);
      } catch (retryError) {
        console.error("Retry failed:", retryError);
        return "Sorry, I'm having trouble connecting right now. Please try again later.";
      }
    }

    console.error("Gemini Error:", error);
    return "Sorry, I'm having trouble connecting right now. Please try again later.";
  }
};
