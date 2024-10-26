import React from 'react';
import { Brain, Rocket, Users, Zap } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const services = [
  {
    icon: <Brain className="h-12 w-12 text-primary mb-4 transition-transform duration-300 group-hover:scale-110" />,
    title: 'AI for Creators',
    description: 'Elevate your creative workflow with intelligent tools and seamless automation.',
    details: 'Unlock new levels of creativity by integrating AI into your artistic process, enhancing productivity without compromising your unique vision.',
    category: 'creativity',
    link: 'https://www.futuretools.io/?tags-n5zn=music%7Cgenerative-video%7Ccopywriting%7Cmarketing%7Cinspiration&tags-vq3k=matts-picks'
  },
  {
    icon: <Zap className="h-12 w-12 text-primary mb-4 transition-transform duration-300 group-hover:scale-110" />,
    title: 'Process Automation',
    description: 'Optimize and streamline repetitive tasks with bespoke automation solutions.',
    details: 'Focus on what matters most while AI handles routine operations, improving efficiency and reducing operational costs.',
    category: 'automation',
    link: 'https://fathom.video/invite/mzereQ'
  },
  {
    icon: <Rocket className="h-12 w-12 text-primary mb-4 transition-transform duration-300 group-hover:scale-110" />,
    title: 'AI Strategy Consulting',
    description: 'Navigate the AI landscape with expert strategic guidance.',
    details: 'Develop and implement effective AI strategies tailored to your business goals, ensuring successful integration and long-term success.',
    category: 'strategy',
    action: 'contact'
  },
  {
    icon: <Users className="h-12 w-12 text-primary mb-4 transition-transform duration-300 group-hover:scale-110" />,
    title: 'Team Training',
    description: 'Empower your team with practical AI skills and knowledge.',
    details: 'Equip your workforce with the expertise to harness AI technologies, driving innovation from within.',
    category: 'training',
    action: 'contact'
  }
];

const Services: React.FC = () => {
  const { elementRef, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  const handleServiceClick = (service: typeof services[0]) => {
    if (service.action === 'contact') {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        const offset = 80;
        const elementPosition = contactSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    } else if (service.link) {
      window.open(service.link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4" ref={elementRef}>
        <div className="text-center mb-16">
          <h2 
            className={`text-4xl font-bold mb-4 text-white animate-on-scroll fade-in ${
              isVisible ? 'is-visible' : ''
            }`}
            style={{ transitionDelay: '0.2s' }}
          >
            Ready to Transform with AI?
          </h2>
          <p 
            className={`text-lg text-text-secondary max-w-2xl mx-auto animate-on-scroll fade-in ${
              isVisible ? 'is-visible' : ''
            }`}
            style={{ transitionDelay: '0.4s' }}
          >
            Learn more about who we are and how our AI expertise can elevate your business. 
            Reach out to us today to start your AI journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              onClick={() => handleServiceClick(service)}
              className={`neo-card p-8 rounded-xl animate-on-scroll scale-in group cursor-pointer ${
                isVisible ? 'is-visible' : ''
              }`}
              style={{ transitionDelay: `${0.2 * (index + 3)}s` }}
            >
              <div className="neo-btn rounded-full p-4 inline-block mb-4 group-hover:bg-primary/10 transition-colors duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-primary transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-text-secondary mb-4">{service.description}</p>
              <p className="text-text-secondary text-sm">{service.details}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;