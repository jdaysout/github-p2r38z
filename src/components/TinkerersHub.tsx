import React from 'react';
import { Bot, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const TinkerersHub: React.FC = () => {
  const { elementRef, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  const handleScrollToAI101 = () => {
    const ai101Section = document.getElementById('ai101');
    if (ai101Section) {
      const offset = 80; // Height of fixed header
      const elementPosition = ai101Section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-gradient-to-b from-background via-background to-transparent"
        style={{ zIndex: 1 }}
      />

      <div className="container mx-auto px-4 relative z-10" ref={elementRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-primary/10 mb-6">
            <Bot className="h-12 w-12 text-primary" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Welcome to the{' '}
            <span className="text-primary">Tinkerers' Hub</span>
          </h2>
          
          <p className="text-xl text-text-secondary mb-8 leading-relaxed">
            Where AI meets creativity, and innovation knows no bounds. Ready to{' '}
            <span className="text-primary font-semibold">experiment</span>,{' '}
            <span className="text-primary font-semibold">learn</span>, and{' '}
            <span className="text-primary font-semibold">transform</span> your workflow?
          </p>

          <motion.button
            onClick={handleScrollToAI101}
            className="group flex flex-col items-center gap-2 mx-auto mt-12 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <span className="text-text-secondary group-hover:text-primary transition-colors duration-300">
              Explore More
            </span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <ArrowDown className="h-6 w-6 text-primary" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>

      {/* Gradient divider */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-background"
        style={{ zIndex: 2 }}
      />
    </section>
  );
};

export default TinkerersHub;