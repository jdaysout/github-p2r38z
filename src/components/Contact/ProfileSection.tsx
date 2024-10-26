import React from 'react';
import { Network, Home, Music, Bot, Brain } from 'lucide-react';
import { motion } from 'framer-motion';

interface ExpertiseItem {
  icon: React.ReactNode;
  label: string;
  description: string;
}

const ProfileSection: React.FC = () => {
  const expertise: ExpertiseItem[] = [
    { 
      icon: <Network className="h-8 w-8 text-primary" />, 
      label: "Network Strategy",
      description: "Building connections and optimizing communication flows"
    },
    { 
      icon: <Home className="h-8 w-8 text-primary" />, 
      label: "Real Estate",
      description: "Innovating property solutions with AI integration"
    },
    { 
      icon: <Music className="h-8 w-8 text-primary" />, 
      label: "Music Industry",
      description: "Creating harmony between technology and art"
    },
    { 
      icon: <Bot className="h-8 w-8 text-primary" />, 
      label: "AI Integration",
      description: "Seamlessly incorporating AI into daily workflows"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="neo-card p-8 rounded-xl"
    >
      <div className="text-center mb-12">
        <motion.div 
          initial={{ scale: 0.9 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center justify-center p-6 rounded-full bg-primary/10 mb-6"
        >
          <Brain className="h-16 w-16 text-primary" />
        </motion.div>
        <h2 className="text-4xl font-bold text-white mb-4">
          Meet Jared Richey
        </h2>
        <p className="text-xl text-primary mb-4">Your Guide to AI Innovation</p>
        <p className="text-text-secondary text-lg leading-relaxed max-w-2xl mx-auto">
          A Sales & Network Strategist passionate about exploring new solutions. 
          With experience spanning communications, real estate, business development, 
          and the music industry, I bring a fresh, hands-on approach to AI integration.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {expertise.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="neo-card p-6 rounded-xl hover:bg-primary/10 transition-all duration-300 group"
          >
            <div className="flex flex-col items-center text-center gap-4">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="p-4 rounded-xl bg-background group-hover:bg-primary/5 transition-colors duration-300"
              >
                {item.icon}
              </motion.div>
              <h3 className="text-xl font-semibold text-white">
                {item.label}
              </h3>
              <p className="text-text-secondary">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProfileSection;