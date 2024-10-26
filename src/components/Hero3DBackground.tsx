import React, { useRef, useEffect } from 'react';
import { Scene } from './Hero3D/Scene';
import { useWebGLContext } from '../hooks/useWebGLContext';
import { motion, AnimatePresence } from 'framer-motion';

const Hero3DBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<Scene | null>(null);
  const { initializeWebGL, clearWebGLContext } = useWebGLContext();
  const fallbackRef = useRef<boolean>(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const threeContainer = document.createElement('div');
    threeContainer.style.position = 'absolute';
    threeContainer.style.inset = '0';
    threeContainer.style.zIndex = '0';
    containerRef.current.appendChild(threeContainer);

    const isMobile = window.innerWidth < 768;
    const quality = isMobile ? 'low' : 'high';
    const particleCount = isMobile ? 500 : 1000;

    const setupScene = async () => {
      try {
        await clearWebGLContext(threeContainer);
        const context = await initializeWebGL(threeContainer);
        
        if (!context) {
          throw new Error('WebGL context initialization failed');
        }

        sceneRef.current = new Scene(threeContainer, {
          particleCount,
          quality,
          context
        });

        const handleInteraction = (event: MouseEvent | TouchEvent) => {
          if (!sceneRef.current) return;
          
          if (event instanceof TouchEvent) {
            const touch = event.touches[0];
            if (touch) {
              sceneRef.current.handleMouseMove(touch);
            }
          } else {
            sceneRef.current.handleMouseMove(event);
          }
        };

        const handleResize = () => {
          if (sceneRef.current) {
            sceneRef.current.handleResize();
          }
        };

        window.addEventListener('mousemove', handleInteraction, { passive: true });
        window.addEventListener('touchmove', handleInteraction, { passive: true });
        window.addEventListener('resize', handleResize, { passive: true });

        return () => {
          window.removeEventListener('mousemove', handleInteraction);
          window.removeEventListener('touchmove', handleInteraction);
          window.removeEventListener('resize', handleResize);
        };
      } catch (error) {
        console.warn('Using fallback background');
        fallbackRef.current = true;
        if (threeContainer.parentNode) {
          threeContainer.parentNode.removeChild(threeContainer);
        }
        return undefined;
      }
    };

    const cleanup = setupScene();

    return () => {
      cleanup?.then(() => {
        if (sceneRef.current) {
          sceneRef.current.dispose();
          sceneRef.current = null;
        }
        if (containerRef.current) {
          containerRef.current.innerHTML = '';
        }
      });
    };
  }, [clearWebGLContext, initializeWebGL]);

  return (
    <AnimatePresence>
      {fallbackRef.current ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 50%, 
              rgba(88, 101, 242, 0.2) 0%, 
              rgba(0, 0, 0, 0.95) 50%, 
              rgba(0, 0, 0, 1) 100%)`
          }}
        />
      ) : (
        <motion.div 
          ref={containerRef}
          className="absolute inset-0 overflow-hidden pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            willChange: 'transform',
            backfaceVisibility: 'hidden',
            zIndex: 0
          }}
        />
      )}
    </AnimatePresence>
  );
};

export default Hero3DBackground;