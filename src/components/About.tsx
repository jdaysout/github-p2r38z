import React, { useState, useEffect } from 'react';
import { Brain, Clock, Sparkles, Bot, Rocket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface BenefitCard {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  stats: {
    value: number;
    label: string;
  };
}

const About: React.FC = () => {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [timeSaved, setTimeSaved] = useState(0);
  const { elementRef, isVisible } = useIntersectionObserver({ threshold: 0.1 });
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});

  const benefits: BenefitCard[] = [
    {
      id: 'think-differently',
      icon: <Brain className="h-8 w-8" />,
      title: "Think Differently",
      description: "Break traditional workflows and unlock new perspectives with AI assistance",
      stats: {
        value: 100,
        label: "Success Rate"
      }
    },
    {
      id: 'save-time',
      icon: <Clock className="h-8 w-8" />,
      title: "Save Time, Play More",
      description: "Automate repetitive tasks and focus on strategic thinking",
      stats: {
        value: timeSaved,
        label: "Hours Saved"
      }
    },
    {
      id: 'personalized',
      icon: <Sparkles className="h-8 w-8" />,
      title: "Personalized Strategy",
      description: "Get AI solutions tailored to your unique needs and goals",
      stats: {
        value: 100,
        label: "Custom Solutions"
      }
    }
  ];

  const quizQuestions = [
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

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setTimeSaved(prev => {
          const newValue = prev + 1;
          return newValue > 1000 ? 1000 : newValue;
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const handleCardClick = (id: string) => {
    setActiveCard(activeCard === id ? null : id);
  };

  const handleQuizAnswer = (answer: string) => {
    setQuizAnswers(prev => ({
      ...prev,
      [quizStep]: answer
    }));
    
    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(prev => prev + 1);
    } else {
      setShowQuiz(false);
      handleNavigation('ai101');
    }
  };

  const handleNavigation = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="about" className="py-20 bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-primary rounded-full"
              style={{
                width: Math.random() * 10 + 5,
                height: Math.random() * 10 + 5,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * 100 - 50],
                x: [0, Math.random() * 100 - 50],
                scale: [1, Math.random() + 0.5],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4" ref={elementRef}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isVisible ? 1 : 0, 
                y: isVisible ? 0 : 20 
              }}
              transition={{ 
                duration: 0.6,
                delay: index * 0.2 
              }}
              onClick={() => handleCardClick(benefit.id)}
              className={`neo-card p-6 rounded-xl cursor-pointer transform transition-all duration-300 ${
                activeCard === benefit.id ? 'scale-105 bg-primary/10' : 'hover:scale-105'
              }`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="neo-btn p-3 rounded-xl text-primary">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {benefit.title}
                </h3>
              </div>
              <p className="text-text-secondary mb-4">
                {benefit.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-primary">
                  {benefit.stats.value}
                  <span className="text-sm text-text-secondary ml-1">
                    {benefit.stats.label}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: activeCard === benefit.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Sparkles className="h-5 w-5 text-primary" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {showQuiz ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="neo-card p-8 rounded-xl max-w-2xl mx-auto"
            >
              <h3 className="text-2xl font-bold text-white mb-6">
                {quizQuestions[quizStep].question}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quizQuestions[quizStep].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuizAnswer(option)}
                    className="neo-btn p-4 rounded-xl text-text-secondary hover:text-white hover:bg-primary/20 transition-colors duration-300"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="text-center"
            >
              <button
                onClick={() => handleNavigation('ai101')}
                className="neo-btn px-8 py-4 rounded-xl text-white hover:text-black hover:bg-primary transition-all duration-300 transform hover:scale-105 group"
              >
                <span className="flex items-center gap-2">
                  Start Your AI Adventure
                  <Rocket className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default About;