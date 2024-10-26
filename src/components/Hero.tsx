import React, { useState } from 'react';
import { Cpu } from 'lucide-react';
import Hero3DBackground from './Hero3DBackground';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const Hero: React.FC = () => {
  const { elementRef, isVisible } = useIntersectionObserver({ threshold: 0.1 });
  const [buttonHover, setButtonHover] = useState<string | null>(null);

  const handleButtonClick = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      const offset = 80; // Height of fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative gradient-bg text-white py-32 md:py-48 overflow-hidden">
      <Hero3DBackground />
      <div className="container mx-auto px-4 text-center relative z-10" ref={elementRef as React.RefObject<HTMLDivElement>}>
        <h1 
          className={`text-5xl md:text-7xl font-bold mb-6 relative z-10 animate-on-scroll fade-in ${
            isVisible ? 'is-visible' : ''
          }`}
          style={{ 
            textShadow: `
              0 0 10px rgba(88, 101, 242, 0.8),
              0 0 20px rgba(88, 101, 242, 0.6),
              0 0 30px rgba(88, 101, 242, 0.4),
              0 0 40px rgba(88, 101, 242, 0.2)
            `,
            transitionDelay: '0.2s'
          }}
        >
          Transform Your Business with AI
        </h1>
        <p 
          className={`text-xl md:text-2xl mb-12 max-w-2xl mx-auto relative z-10 animate-on-scroll fade-in ${
            isVisible ? 'is-visible' : ''
          }`}
          style={{ 
            textShadow: '0 0 10px rgba(88, 101, 242, 0.5)',
            transitionDelay: '0.4s'
          }}
        >
          Harness the power of artificial intelligence to streamline your workflow and boost productivity - no technical expertise required.
        </p>
        <div 
          className={`flex flex-col sm:flex-row justify-center items-center gap-6 relative z-10 animate-on-scroll fade-in ${
            isVisible ? 'is-visible' : ''
          }`}
          style={{ transitionDelay: '0.6s' }}
        >
          <button 
            onClick={() => handleButtonClick('ai101')}
            className="neo-btn text-text-secondary font-semibold py-4 px-8 rounded-xl min-w-[200px] flex items-center justify-center gap-2 group relative overflow-hidden opacity-50 hover:opacity-100 transition-opacity duration-300"
            onMouseEnter={() => setButtonHover('sync')}
            onMouseLeave={() => setButtonHover(null)}
          >
            <Cpu className={`h-5 w-5 transition-all duration-300 ${
              buttonHover === 'sync' ? 'animate-pulse text-primary' : ''
            }`} />
            <span className="relative z-10">
              {buttonHover === 'sync' ? '> LEARN_MORE' : '> EXPLORE'}
            </span>
            <div className={`absolute inset-0 bg-primary/10 transition-all duration-300 ${
              buttonHover === 'sync' ? 'opacity-100' : 'opacity-0'
            }`} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;