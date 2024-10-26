import React from 'react';
import { Mail, Instagram, Home, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface ContactMethod {
  icon: React.ReactNode;
  label: string;
  value: string;
  subValue?: string;
  action: () => void;
}

const ContactMethods: React.FC = () => {
  const methods: ContactMethod[] = [
    {
      icon: <Mail className="h-6 w-6 text-primary" />,
      label: 'Email',
      value: 'jdaysout@gmail.com',
      action: () => {
        window.location.href = 'mailto:jdaysout@gmail.com';
      }
    },
    {
      icon: <Instagram className="h-6 w-6 text-primary" />,
      label: 'Instagram',
      value: '@jdaysout',
      action: () => {
        window.open('https://instagram.com/jdaysout', '_blank');
      }
    },
    {
      icon: <Home className="h-6 w-6 text-primary" />,
      label: 'Real Estate',
      value: 'Jared Richey, Compass Realtor®️',
      subValue: 'DRE #02155947',
      action: () => {
        window.open('https://www.compass.com/agents/jared-richey/', '_blank');
      }
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-6">
      {methods.map((method, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          onClick={method.action}
          className="neo-card p-6 rounded-xl hover:transform hover:scale-[1.02] transition-all duration-300 cursor-pointer group"
        >
          <div className="flex items-center gap-4">
            <div className="neo-btn p-4 rounded-full group-hover:bg-primary/10 transition-colors duration-300">
              {method.icon}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-1">{method.label}</h3>
              <p className="text-text-secondary">{method.value}</p>
              {method.subValue && (
                <p className="text-sm text-text-secondary">{method.subValue}</p>
              )}
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ArrowRight className="h-5 w-5 text-primary" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ContactMethods;