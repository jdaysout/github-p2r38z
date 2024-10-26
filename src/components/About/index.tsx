import React, { useState } from 'react';
import { Bot, Rocket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import BenefitCard from './BenefitCard';
import FloatingParticles from './FloatingParticles';
import TinkerersProfile from './TinkerersProfile';
import QuizSection from './QuizSection';

const About: React.FC = () => {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const { elementRef, isVisible } = useIntersectionObserver({ threshold: 0.1 });
  const [showQuiz, setShowQuiz] = useState(false);

  const handleCardClick = (id: string) => {
    setActiveCard(activeCard === id ? null : id);
  };

  const handleQuizComplete = () => {
    setShowQuiz(false);
    handleNavigation('ai101');
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
      <FloatingParticles />

      <div className="container mx-auto px-4" ref={elementRef}>
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.6 }}
            className="welcome-section" // Added class for scroll target
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white flex items-center justify-center gap-3">
              <Bot className="h-12 w-12 text-primary" />
              Welcome to the Tinkerers' Hub
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Where AI meets creativity, and innovation knows no bounds. 
              Ready to experiment, learn, and transform your workflow?
            </p>
          </motion.div>
        </div>

        <TinkerersProfile />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={benefit.id}
              {...benefit}
              isActive={activeCard === benefit.id}
              onClick={() => handleCardClick(benefit.id)}
              index={index}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {showQuiz ? (
            <QuizSection onComplete={handleQuizComplete} />
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