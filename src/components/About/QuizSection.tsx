import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuizSectionProps {
  onComplete: () => void;
}

const QuizSection: React.FC<QuizSectionProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  const questions = [
    {
      question: "What's your primary goal with AI?",
      options: [
        "Automate Tasks",
        "Enhance Creativity",
        "Improve Decision Making",
        "Learn & Experiment"
      ]
    },
    {
      question: "How do you prefer to learn new tools?",
      options: [
        "Hands-on Practice",
        "Visual Learning",
        "Guided Tutorials",
        "Open Exploration"
      ]
    },
    {
      question: "What's your experience level with AI?",
      options: [
        "Complete Beginner",
        "Some Experience",
        "Regular User",
        "Advanced User"
      ]
    }
  ];

  const handleAnswer = () => {
    if (step < questions.length - 1) {
      setStep(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="neo-card p-8 rounded-xl max-w-2xl mx-auto"
      >
        <h3 className="text-2xl font-bold text-white mb-6">
          {questions[step].question}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {questions[step].options.map((option, index) => (
            <button
              key={index}
              onClick={handleAnswer}
              className="neo-btn p-4 rounded-xl text-text-secondary hover:text-white hover:bg-primary/20 transition-colors duration-300"
            >
              {option}
            </button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default QuizSection;