import React, { useState, useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Bot, Zap, Calendar, MessageSquare, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface AITool {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
  link: string;
  linkText: string;
}

const AI101: React.FC = () => {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [transitioningCard, setTransitioningCard] = useState<string | null>(null);
  const { elementRef, isVisible } = useIntersectionObserver({ threshold: 0.1 });
  const overlayRef = useRef<HTMLDivElement>(null);

  const aiTools: AITool[] = [
    {
      id: 'chatgpt',
      icon: <Bot className="h-8 w-8 text-primary" />,
      title: 'Start with ChatGPT',
      description: 'Begin your AI journey with ChatGPT. Learn how to use this powerful tool for various tasks.',
      action: 'Ask ChatGPT a question about a topic you\'re curious about and see how it responds.',
      link: 'https://chat.openai.com',
      linkText: 'Try It Now'
    },
    {
      id: 'automation',
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: 'Create Something New',
      description: 'Experiment with AI to generate ideas, content, or solutions for your projects.',
      action: 'Use AI to brainstorm a new business idea or create a piece of art.',
      link: 'https://www.futuretools.io/',
      linkText: 'Start Creating'
    },
    {
      id: 'creators',
      icon: <Bot className="h-8 w-8 text-primary" />,
      title: 'AI for Creators',
      description: 'Enhance your creative workflow with AI-powered tools and automation.',
      action: 'Generate stunning visuals and artwork using advanced AI tools.',
      link: 'https://crayo.ai/?ref=jaysout',
      linkText: 'Start Creating'
    },
    {
      id: 'advanced',
      icon: <MessageSquare className="h-8 w-8 text-primary" />,
      title: 'Advanced AI Tools',
      description: 'Ready for more? Explore advanced AI tools and platforms for deeper integration.',
      action: 'Discover new AI tools and experiment with different applications.',
      link: 'https://www.futuretools.io/',
      linkText: 'Explore More'
    }
  ];

  const handleCardClick = async (tool: AITool) => {
    setTransitioningCard(tool.id);
    
    if (overlayRef.current) {
      overlayRef.current.style.opacity = '1';
      overlayRef.current.style.visibility = 'visible';
    }

    await new Promise(resolve => setTimeout(resolve, 500));
    window.open(tool.link, '_blank', 'noopener,noreferrer');
    
    if (overlayRef.current) {
      overlayRef.current.style.opacity = '0';
      overlayRef.current.style.visibility = 'hidden';
    }
    
    setTransitioningCard(null);
  };

  return (
    <section id="ai101" className="py-20 bg-background relative">
      <div className="container mx-auto px-4" ref={elementRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Getting Started with AI
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Begin your AI journey with these simple steps. Each tool and resource is carefully 
            selected to help you start using AI effectively.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {aiTools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isVisible ? 1 : 0, 
                y: isVisible ? 0 : 20 
              }}
              transition={{ 
                duration: 0.6,
                delay: index * 0.1 
              }}
              onClick={() => handleCardClick(tool)}
              className={`neo-card p-6 rounded-xl cursor-pointer group h-full flex flex-col ${
                transitioningCard === tool.id ? 'scale-105' : ''
              }`}
            >
              <div className="neo-btn p-4 rounded-xl mb-4 group-hover:bg-primary/10 transition-colors duration-300">
                {tool.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-primary transition-colors duration-300">
                {tool.title}
              </h3>
              <p className="text-text-secondary mb-4">
                {tool.description}
              </p>
              <div className="mb-6 p-4 bg-surface/50 rounded-lg border border-primary/10 flex-grow">
                <p className="text-sm font-semibold text-primary mb-2">Action:</p>
                <p className="text-text-secondary text-sm">
                  {tool.action}
                </p>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-primary group-hover:text-white group-hover:bg-primary transition-colors duration-300">
                {tool.linkText}
                <ArrowRight className="h-4 w-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Translucent Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm opacity-0 invisible transition-all duration-500 z-50"
        style={{
          willChange: 'opacity, visibility'
        }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    </section>
  );
};

export default AI101;