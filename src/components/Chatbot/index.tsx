import React, { useState } from 'react';
import ChatbotButton from './ChatbotButton';
import ChatWindow from './ChatWindow';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ChatbotButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      <ChatWindow isOpen={isOpen} />
    </>
  );
};

export default Chatbot;