import { GoogleGenerativeAI } from "@google/generative-ai";
import { Bio, skills, education, experience, projects } from "../data/Data.js";

// Create the context from Data.js
const systemPrompt = `You are an AI assistant for ${Bio.name}'s portfolio website. You should ONLY answer questions related to Ahsin Ali's professional background, education, skills, projects, and work experience based on the following data:

PERSONAL INFO:
${JSON.stringify(Bio, null, 2)}

SKILLS:
${JSON.stringify(skills, null, 2)}

EDUCATION:
${JSON.stringify(education, null, 2)}

WORK EXPERIENCE:
${JSON.stringify(experience, null, 2)}

PROJECTS:
${JSON.stringify(projects, null, 2)}

INSTRUCTIONS:
- Answer questions about Ahsin Ali's background, skills, education, projects, and professional experience
- Be conversational and helpful
- If asked about topics unrelated to Ahsin's professional profile, politely decline and redirect to relevant topics
- Keep responses concise but informative
- You can suggest related questions about his work or skills`;

// Initialize the Gemini AI
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash",
      systemInstruction: systemPrompt
});

// Chat session management
let chatSession = null;

// Initialize chat session
const initializeChatSession = () => {
  if (!chatSession) {
    chatSession = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "Hello! I'd like to know about Ahsin Ali." }]
        },
        {
          role: "model",
          parts: [{ text: "Hi! I'm here to help you learn about Ahsin Ali's professional background, skills, education, and projects. What would you like to know?" }]
        }
      ]
    });
  }
  return chatSession;
};

// Reset chat session (useful for new conversations)
export const resetChatSession = () => {
  chatSession = null;
  return initializeChatSession();
};

// Get chat history for persistence
// export const getChatHistory = () => {
//   return chatSession ? chatSession.getHistory() : [];
// };

// Restore chat session from history
export const restoreChatSession = (history) => {
  chatSession = model.startChat({ history });
  return chatSession;
};

export const askAboutMe = async (question) => {
  try {
    const chat = initializeChatSession();
    const result = await chat.sendMessage(question);
    const response = result.response.text();
    
    return response;
  } catch (error) {
    console.error("Error with Gemini API:", error);
    console.error("Full error details:", error.message);
    return "Sorry, I'm having trouble connecting right now. Please try again later.";
  }
};