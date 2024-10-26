import React, { useState, useEffect } from 'react';
import { Brain, Menu, X } from 'lucide-react';

interface MenuItem {
  id: string;
  label: string;
}

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  const menuItems: MenuItem[] = [
    { id: 'ai101', label: 'AI 101' },
    { id: 'services', label: 'SERVICES' },
    { id: 'about', label: 'ABOUT' },
    { id: 'contact', label: 'CONTACT' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = menuItems.reduce((acc, item) => ({
        ...acc,
        [item.id]: document.getElementById(item.id)
      }), {});

      const scrollPosition = window.scrollY + 100;

      for (const [section, element] of Object.entries(sections)) {
        if (element && scrollPosition >= element.offsetTop && scrollPosition < (element.offsetTop + element.offsetHeight)) {
          setActiveSection(section);
          break;
        }
      }

      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuItems]);

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Height of fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled ? 'py-2' : 'py-4'
      }`}
    >
      <div className="absolute inset-0 bg-background/90 backdrop-blur-md transition-colors duration-500" />

      <nav className="container mx-auto px-4">
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-2 group">
            <Brain className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`group relative py-2 uppercase tracking-wider text-sm font-medium transition-colors duration-300 ${
                  activeSection === item.id ? 'text-primary' : 'text-text-secondary hover:text-white'
                }`}
              >
                <span className="relative z-10">{item.label}</span>
                <span 
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform origin-left transition-transform duration-300 ${
                    activeSection === item.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`} 
                />
              </button>
            ))}
            
            <button
              onClick={() => handleNavClick('contact')}
              className="neo-btn px-6 py-2 rounded-lg text-white border border-white/20 hover:border-primary hover:text-primary transition-all duration-300 hover:scale-105"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden neo-btn p-2 rounded-lg"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden fixed inset-0 bg-background/95 backdrop-blur-md transition-all duration-500 ${
            isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          style={{ top: '64px' }}
        >
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-2xl font-medium uppercase tracking-wider transition-colors duration-300 ${
                  activeSection === item.id ? 'text-primary' : 'text-text-secondary hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('contact')}
              className="neo-btn px-8 py-3 rounded-lg text-white border border-white/20 hover:border-primary hover:text-primary transition-all duration-300"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;