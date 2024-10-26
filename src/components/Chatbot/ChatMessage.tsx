import React from 'react';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: {
    content: string;
    sender: 'bot' | 'user';
    timestamp: Date;
  };
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.sender === 'bot';

  return (
    <div className={`flex gap-3 ${isBot ? '' : 'flex-row-reverse'}`}>
      <div className={`neo-btn p-2 rounded-full ${isBot ? 'text-primary' : 'text-text-secondary'}`}>
        {isBot ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
      </div>
      <div
        className={`neo-card max-w-[80%] p-3 rounded-xl ${
          isBot ? 'bg-primary/10' : 'bg-surface/50'
        }`}
      >
        <p className="text-sm">{message.content}</p>
        <span className="text-xs text-text-secondary mt-1 block">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;