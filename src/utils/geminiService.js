// Lazy imports
let GoogleGenerativeAI = null;
let portfolioData = null;

// Dynamic imports for better performance
const loadDependencies = async () => {
  if (!GoogleGenerativeAI) {
    const { GoogleGenerativeAI: GAI } = await import("@google/generative-ai");
    GoogleGenerativeAI = GAI;
  }
  
  if (!portfolioData) {
    const data = await import("../data/Data.js");
    portfolioData = {
      Bio: data.Bio,
      skills: data.skills,
      education: data.education,
      experience: data.experience,
      projects: data.projects
    };
  }
  
  return { GoogleGenerativeAI, portfolioData };
};

// Create system prompt dynamically
const createSystemPrompt = (data) => `You are an AI assistant for ${data.Bio.name}'s portfolio website. You should ONLY answer questions related to Ahsin Ali's professional background, education, skills, projects, and work experience based on the following data:

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

// Initialize the Gemini AI lazily
let genAI = null;
let model = null;

// Chat session management
let chatSession = null;

// Initialize chat session
const initializeChatSession = async () => {
  if (!chatSession) {
    const { GoogleGenerativeAI, portfolioData } = await loadDependencies();
    
    if (!genAI) {
      genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      model = genAI.getGenerativeModel({ 
        model: "gemini-2.0-flash",
        systemInstruction: createSystemPrompt(portfolioData)
      });
    }
    
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
export const resetChatSession = async () => {
  chatSession = null;
  return await initializeChatSession();
};

// Get chat history for persistence
// export const getChatHistory = () => {
//   return chatSession ? chatSession.getHistory() : [];
// };

// Restore chat session from history
export const restoreChatSession = async (history) => {
  const { GoogleGenerativeAI, portfolioData } = await loadDependencies();
  
  if (!genAI) {
    genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
    model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash",
      systemInstruction: createSystemPrompt(portfolioData)
    });
  }
  
  chatSession = model.startChat({ history });
  return chatSession;
};

export const askAboutMe = async (question) => {
  try {
    const chat = await initializeChatSession();
    const result = await chat.sendMessage(question);
    const response = result.response.text();
    
    return response;
  } catch (error) {
    return "Sorry, I'm having trouble connecting right now. Please try again later.";
  }
};