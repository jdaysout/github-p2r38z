import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface BenefitCardProps {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  metric: {
    value: string;
    label: string;
  };
  isActive: boolean;
  onClick: () => void;
  index: number;
}

const BenefitCard: React.FC<BenefitCardProps> = ({
  icon,
  title,
  description,
  metric,
  isActive,
  onClick,
  index
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0 
      }}
      transition={{ 
        duration: 0.6,
        delay: index * 0.2 
      }}
      onClick={onClick}
      className={`neo-card p-6 rounded-xl cursor-pointer transform transition-all duration-300 ${
        isActive ? 'scale-105 bg-primary/10' : 'hover:scale-105'
      }`}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="neo-btn p-3 rounded-xl text-primary">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-white">
          {title}
        </h3>
      </div>
      <p className="text-text-secondary mb-4">
        {description}
      </p>
      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold text-primary">
          {metric.value}
          <span className="text-sm text-text-secondary ml-1">
            {metric.label}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isActive ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Sparkles className="h-5 w-5 text-primary" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BenefitCard;