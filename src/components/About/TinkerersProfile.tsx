import React from 'react';
import { Network, Home, Music, Bot, Brain } from 'lucide-react';
import { motion } from 'framer-motion';

const TinkerersProfile: React.FC = () => {
  const expertise = [
    { 
      icon: <Network className="h-6 w-6" />, 
      label: "Network Strategy",
      description: "Building connections and optimizing communication flows"
    },
    { 
      icon: <Home className="h-6 w-6" />, 
      label: "Real Estate",
      description: "Innovating property solutions with AI integration"
    },
    { 
      icon: <Music className="h-6 w-6" />, 
      label: "Music Industry",
      description: "Creating harmony between art and technology"
    },
    { 
      icon: <Bot className="h-6 w-6" />, 
      label: "AI Integration",
      description: "Seamlessly incorporating AI into daily workflows"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="neo-card p-8 rounded-xl mb-12"
    >
      <div className="flex flex-col gap-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-primary/10 mb-4">
            <Brain className="h-12 w-12 text-primary" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-4">
            Meet Jared Richey
          </h3>
          <p className="text-xl text-primary mb-2">Your Guide to AI Innovation</p>
          <p className="text-text-secondary max-w-2xl mx-auto">
            A Sales & Network Strategist passionate about exploring new solutions. 
            With experience spanning communications, real estate, business development, 
            and the music industry, I bring a fresh, hands-on approach to AI integration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {expertise.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="neo-card p-4 rounded-xl hover:bg-primary/10 transition-colors duration-300 cursor-pointer group"
            >
              <div className="flex flex-col items-center text-center gap-3">
                <div className="p-3 rounded-lg bg-background group-hover:bg-primary/5 transition-colors duration-300">
                  {item.icon}
                </div>
                <h4 className="font-semibold text-white">
                  {item.label}
                </h4>
                <p className="text-sm text-text-secondary">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TinkerersProfile;