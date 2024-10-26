import React from 'react';
import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import ProfileSection from './ProfileSection';
import ContactMethods from './ContactMethods';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 gradient-bg">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-16">
          <ProfileSection />

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-5xl font-bold text-white mb-4 tracking-tight">
                LET'S CONNECT
              </h2>
              <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
                Ready to transform your business with AI? Reach out through any of these 
                channels and let's start a conversation.
              </p>
            </motion.div>

            <div className="max-w-2xl mx-auto">
              <ContactMethods />
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12 text-center"
            >
              <div className="inline-flex items-center gap-2 neo-card px-6 py-3 rounded-xl bg-primary/10">
                <ExternalLink className="h-5 w-5 text-primary" />
                <span className="text-text-secondary">All links open in a new tab</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;