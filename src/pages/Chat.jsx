import { useState, useRef, useEffect } from "react";
import BgAnimation from '../components/HeroBgAnimation';
import "../components/Navbar.css";
import {Link} from "react-router-dom";
import { askAboutMe } from "../utils/geminiService";

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
      try {
        const parsedMessages = JSON.parse(savedMessages);
        if (Array.isArray(parsedMessages)) setMessages(parsedMessages);
      } catch {
        localStorage.removeItem('chatMessages');
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
    localStorage.removeItem('chatMessages');
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMessage = input;
    const updatedMessages = [...messages, { sender: "user", text: userMessage }];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);
    
    try {
      const response = await askAboutMe(updatedMessages);
      setMessages(prev => [...prev, { sender: "model", text: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { sender: "model", text: "Sorry, I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat flex flex-col w-screen overflow-hidden h-screen relative z-0 bg-[var(--color-ink)]">
      <BgAnimation/>
      {/* Header with Logo and Reset Button */}
      <div className="flex justify-between items-center px-6 py-4 fixed w-full top-0 bg-[var(--color-ink-soft)] border-b border-[var(--color-border)] z-10">
        <div className="logo text-sm md:text-2xl text-white">
          <Link className="logopic" to="/">
            Portfolio<span className="dot">.</span>
          </Link>
        </div>
        <button
          onClick={handleResetChat}
          className="border border-[var(--color-primary)] text-[var(--color-primary)] px-4 py-2 rounded-lg text-sm font-semibold transition-colors hover:bg-[var(--color-primary)] hover:text-[var(--color-ink)]"
        >
          Reset Chat
        </button>
      </div>

      <div className="w-full flex-1 overflow-y-auto p-4 mt-20 pb-28" aria-live="polite" aria-label="Chat messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`w-full mb-2 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`px-4 py-2 rounded-lg max-w-[70%] overflow-x-hidden text-sm shadow-md ${msg.sender === "user" ? "bg-[var(--color-primary)] text-[var(--color-ink)]" : "bg-[var(--color-surface)] text-[var(--color-text)]"}`}>
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
      <form onSubmit={handleSend} className="w-full flex items-center p-4 fixed bottom-0 bg-[var(--color-ink-soft)] border-t border-[var(--color-border)]">
        <label className="sr-only" htmlFor="chat-input">Ask a question about Ahsin</label>
        <input
          id="chat-input"
          className="w-[70%] sm:flex-1 border border-[var(--color-border-strong)] bg-[var(--color-ink)] text-[var(--color-text)] rounded-l-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your question..."
        />
        <button
          type="submit"
          aria-label="Send question"
          className="w-[30%] sm:w-auto bg-[var(--color-primary)] text-[var(--color-ink)] px-6 py-2 rounded-r-full font-semibold hover:bg-[var(--color-primary-strong)] transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
