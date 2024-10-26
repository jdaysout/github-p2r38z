import React from 'react';
import { Mail, Instagram, Home, ExternalLink, ArrowRight, Network, Music, Bot, Brain } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
  const expertise = [
    { 
      icon: <Network className="h-6 w-6 text-primary" />, 
      label: "Network Strategy",
      description: "Building connections and optimizing communication flows"
    },
    { 
      icon: <Home className="h-6 w-6 text-primary" />, 
      label: "Real Estate",
      description: "Innovating property solutions with AI integration"
    },
    { 
      icon: <Music className="h-6 w-6 text-primary" />, 
      label: "Music Industry",
      description: "Creating harmony between technology and art"
    },
    { 
      icon: <Bot className="h-6 w-6 text-primary" />, 
      label: "AI Integration",
      description: "Seamlessly incorporating AI into daily workflows"
    }
  ];

  const contactMethods = [
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
    <section id="contact" className="py-20 gradient-bg">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="neo-card p-8 rounded-xl mb-16"
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center p-4 rounded-full bg-primary/10 mb-4">
                <Brain className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">
                Meet Jared Richey
              </h3>
              <p className="text-xl text-primary mb-2">Your Guide to AI Innovation</p>
              <p className="text-text-secondary max-w-2xl mx-auto mb-8">
                A Sales & Network Strategist passionate about exploring new solutions. 
                With experience spanning communications, real estate, business development, 
                and the music industry, I bring a fresh, hands-on approach to AI integration.
              </p>
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

          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
            Let's Connect
          </h2>
          <p className="text-lg text-text-secondary text-center mb-12 max-w-2xl mx-auto">
            Ready to transform your business with AI? Reach out through any of these channels and let's start a conversation.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                onClick={method.action}
                className="neo-card p-6 rounded-xl hover:transform hover:scale-[1.02] transition-all duration-300 cursor-pointer group"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="neo-btn p-4 rounded-full mb-4 group-hover:bg-primary/10 transition-colors duration-300">
                    {method.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{method.label}</h3>
                  <p className="text-text-secondary mb-1">{method.value}</p>
                  {method.subValue && (
                    <p className="text-sm text-text-secondary">{method.subValue}</p>
                  )}
                  <div className="mt-4 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm">Connect</span>
                    <ArrowRight className="h-4 w-4 text-primary" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 neo-card px-6 py-3 rounded-xl bg-primary/10">
              <ExternalLink className="h-5 w-5 text-primary" />
              <span className="text-text-secondary">All links open in a new tab</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;