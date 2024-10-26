import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import ChatMessage from './ChatMessage';

interface ChatWindowProps {
  isOpen: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ isOpen }) => {
  const [messages, setMessages] = useState<Array<{
    content: string;
    sender: 'bot' | 'user';
    timestamp: Date;
  }>>([
    {
      content: "Hi! I'm your AI assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [hasConsent, setHasConsent] = useState(() => {
    return localStorage.getItem('chatbot_consent') === 'true';
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleConsent = () => {
    localStorage.setItem('chatbot_consent', 'true');
    setHasConsent(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      content: input,
      sender: 'user' as const,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const botMessage = {
        content: "I understand you're interested in AI solutions. Would you like to learn more about our services or schedule a consultation?",
        sender: 'bot' as const,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  if (!isOpen) return null;

  if (!hasConsent) {
    return (
      <div className="fixed bottom-24 right-6 z-50 w-80 neo-card p-4 rounded-xl">
        <p className="text-sm mb-4">
          This chat uses local storage to remember your preferences and provide a better experience.
          No personal data is collected or shared with third parties.
        </p>
        <button
          onClick={handleConsent}
          className="neo-btn text-primary w-full py-2 rounded-lg hover:bg-primary hover:text-white transition-colors duration-300"
        >
          Accept & Continue
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-24 right-6 z-50 w-80 neo-card rounded-xl">
      <div className="p-4 border-b border-surface">
        <h3 className="text-lg font-semibold">AI Assistant</h3>
        <p className="text-sm text-text-secondary">Ask me anything about our services</p>
      </div>
      
      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-surface">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="neo-input flex-1 rounded-lg px-3 py-2 text-sm"
          />
          <button
            type="submit"
            className="neo-btn p-2 rounded-lg text-primary hover:text-white hover:bg-primary transition-colors duration-300"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;