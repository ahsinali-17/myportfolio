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
}'s portfolio website. You should ONLY answer questions related to ${data.Bio.name}'s professional background, education, skills, projects, and work experience based on the following data:

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
- Answer questions about ${data.Bio.name}'s background, skills, education, projects, and professional experience
- Be conversational and helpful
- If asked about topics unrelated to ${data.Bio.name}'s professional profile, politely decline and redirect to relevant topics
- Keep responses concise, to the point but informative.
- Give selective answers based on the data provided. Dont tell about the whole section if they ask about a specific part. For example, if you're asked, where i live, keep it to the point and say Wah cantt,Pakistan. Then ask if they want more information. Dont tell them about the time zone, it is not relevant. If you don't know the answer, say "I'm not sure about that."
- You can suggest related questions about his work or skills`;

// Helper to initialize the Model with the CURRENT key
const initializeModel = () => {
  const apiKey = API_KEYS[currentKeyIndex];
  if (!apiKey) {
    throw new Error(`Gemini API Key missing for index: ${currentKeyIndex}`);
  }

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
          parts: [{ text: `Hello! I'd like to know about ${data.Bio.name}.` }],
        },
        {
          role: "model",
          parts: [
            {
              text: `Hi! I'm here to help you learn about ${data.Bio.name}'s professional background, skills, education, and projects. What would you like to know?`,
            },
          ],
        },
      ],
    });
  }
  return chatSession;
};

// Reset chat session
export const resetChatSession = () => {
  chatSession = null;
  return initializeChatSession();
};

// Restore chat session from history (Exported)
export const restoreChatSession = (history) => {
  chatSession = null;
  return initializeChatSession(history);
};

const rotateKeyAndRetry = async (question, history) => {
  const startKeyIndex = currentKeyIndex;

  for (let i = 1; i < API_KEYS.length; i++) {
    currentKeyIndex = (startKeyIndex + i) % API_KEYS.length;
    model = null; // Force reinitialization with new key
    const chat = initializeChatSession(history);
    try {
      const result = await chat.sendMessage(question);
      return result.response.text();
    } catch (error) {
      const isQuotaError =
        error.response?.status === 429 ||
        error.message?.includes("429") ||
        error.message?.includes("Quota");
      if (!isQuotaError) {
        console.error("Non-quota error during retry:", error);
        break;
      }
      console.warn(
        `Quota error with key index ${currentKeyIndex}, trying next key...`,
      );
    }
  }

  currentKeyIndex = startKeyIndex;
  throw new Error("All API keys have reached their quota limits.");
};

export const askAboutMe = async (question) => {
  try {
    const chat = initializeChatSession();
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
