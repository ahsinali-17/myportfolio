import React, { useState, useRef, useEffect } from "react";
import BgAnimation from './HeroBgAnimation';
import "./Navbar.css";
import {Link} from "react-router-dom";
import { askAboutMe, resetChatSession, restoreChatSession } from "../utils/geminiService";

const Chat = () => {
  const [messages, setMessages] = useState([
    { sender: "model", text: "Hi! I'm here to help you learn about Ahsin Ali's professional background, skills, education, and projects. What would you like to know?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Load chat history from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      const parsedMessages = JSON.parse(savedMessages);
      setMessages(parsedMessages);
      
      // Restore Gemini chat session from saved messages
      const geminiHistory = parsedMessages.slice(1).map(msg => ({
        role: msg.sender,
        parts: [{ text: msg.text }]
      }));
      
      if (geminiHistory.length > 0) {
        // Add initial context
        const fullHistory = [
          {
            role: "user",
            parts: [{ text: "Hello! I'd like to know about Ahsin Ali." }]
          },
          {
            role: "model",
            parts: [{ text: "Hi! I'm here to help you learn about Ahsin Ali's professional background, skills, education, and projects. What would you like to know?" }]
          },
          ...geminiHistory
        ];
        restoreChatSession(fullHistory);
      }
    }
  }, []);

  // Save messages to localStorage whenever messages change
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Reset conversation
  const handleResetChat = () => {
    const initialMessage = { sender: "model", text: "Hi! I'm here to help you learn about Ahsin Ali's professional background, skills, education, and projects. What would you like to know?" };
    setMessages([initialMessage]);
    resetChatSession();
    localStorage.removeItem('chatMessages');
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMessage = input;
    setMessages(prev => [...prev, { sender: "user", text: userMessage }]);
    setInput("");
    setLoading(true);
    
    try {
      const response = await askAboutMe(userMessage);
      setMessages(prev => [...prev, { sender: "model", text: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { sender: "model", text: "Sorry, I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat flex flex-col w-screen overflow-hidden h-screen relative z-0 bg-[#6d28d9]">
      <BgAnimation/>
      {/* Header with Logo and Reset Button */}
      <div className="flex justify-between items-center px-6 py-4 fixed w-full top-0 bg-[#6d28d9] z-10">
        <div className="logo text-sm md:text-2xl text-white">
          <Link className="logopic" to="/">
            Portfolio<span className="dot">.</span>
          </Link>
        </div>
        <button
          onClick={handleResetChat}
          className="bg-[#9c27b0] hover:bg-[#ba25d4] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
        >
          Reset Chat
        </button>
      </div>

      <div className="w-full flex-1 overflow-y-auto p-4 mt-20">
        {messages.map((msg, idx) => (
          <div key={idx} className={`w-full mb-2 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`px-4 py-2 rounded-lg max-w-[70%] overflow-x-hidden text-sm shadow-md ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-white text-gray-800"}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="mb-2 flex justify-start">
            <div className="px-4 py-2 rounded-lg max-w-xs text-sm shadow-md bg-white text-gray-800">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSend} className="w-full flex items-center p-2 sm:p-4">
        <input
          className="w-[70%] sm:flex-1 border rounded-l-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your question..."
        />
        <button
          type="submit"
          className="w-[30%] sm:w-auto bg-[#9c27b0] text-white px-6 py-2 rounded-r-full font-semibold hover:bg-[#ba25d4] hover:scale-105 transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
