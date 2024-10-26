import React from 'react';
import { Brain, Mail, Instagram, Home } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-surface">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Brain className="h-8 w-8 text-primary" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Services', 'About Us', 'Solutions', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    className="text-text-secondary hover:text-primary transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-2 text-white">
                <Mail className="h-5 w-5 text-primary" />
                <span>jdaysout@gmail.com</span>
              </li>
              <li className="flex items-center gap-2 text-white">
                <Instagram className="h-5 w-5 text-primary" />
                <span>@jdaysout</span>
              </li>
              <li className="flex items-start gap-2 text-white">
                <Home className="h-5 w-5 text-primary mt-1" />
                <div className="flex flex-col">
                  <a 
                    href="https://www.compass.com/agents/jared-richey/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors duration-300"
                  >
                    Jared Richey, Compass Realtor®️
                  </a>
                  <span className="text-sm">DRE #02155947</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-surface/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-text-secondary text-sm">
              © {currentYear} All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-text-secondary hover:text-primary text-sm transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-text-secondary hover:text-primary text-sm transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="text-text-secondary hover:text-primary text-sm transition-colors duration-300">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;