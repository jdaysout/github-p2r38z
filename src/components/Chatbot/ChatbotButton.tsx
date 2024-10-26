import React from 'react';
import { MessageSquare, X } from 'lucide-react';

interface ChatbotButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const ChatbotButton: React.FC<ChatbotButtonProps> = ({ isOpen, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="neo-btn fixed bottom-6 right-6 z-50 p-4 rounded-full text-primary hover:text-white group"
      aria-label={isOpen ? 'Close chat' : 'Open chat'}
    >
      {isOpen ? (
        <X className="h-6 w-6 transition-transform duration-300 group-hover:rotate-90" />
      ) : (
        <MessageSquare className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
      )}
    </button>
  );
};

export default ChatbotButton;