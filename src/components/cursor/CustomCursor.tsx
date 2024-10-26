import React, { useEffect, useRef } from 'react';
import { CursorManager } from './CursorManager';
import { useCursorPosition } from './useCursorPosition';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const managerRef = useRef<CursorManager | null>(null);
  const rafId = useRef<number>();
  
  const { 
    position, 
    isVisible, 
    isHovering 
  } = useCursorPosition();

  useEffect(() => {
    const cursor = cursorRef.current;
    const canvas = canvasRef.current;
    if (!cursor || !canvas) return;

    // Initialize cursor manager after a short delay to avoid context conflicts
    const initTimeout = setTimeout(() => {
      try {
        if (managerRef.current) {
          managerRef.current.dispose();
        }
        managerRef.current = new CursorManager(canvas);
      } catch (e) {
        console.warn('WebGL cursor effects disabled:', e);
      }
    }, 100);

    const updateCursor = () => {
      if (!cursor) return;

      cursor.style.transform = `translate3d(${position.x}px, ${position.y}px, 0)`;
      
      if (managerRef.current?.isValid()) {
        managerRef.current.updatePositions(position.x, position.y);
        managerRef.current.render();
      }

      rafId.current = requestAnimationFrame(updateCursor);
    };

    rafId.current = requestAnimationFrame(updateCursor);

    const handleResize = () => {
      if (managerRef.current?.isValid()) {
        managerRef.current.resize();
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      clearTimeout(initTimeout);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      if (managerRef.current) {
        managerRef.current.dispose();
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [position]);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}
      />
      <div 
        ref={cursorRef} 
        className={`custom-cursor ${isHovering ? 'hovering' : ''}`}
        style={{ 
          opacity: isVisible ? 1 : 0,
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          willChange: 'transform',
          pointerEvents: 'none',
          zIndex: 100000
        }} 
      />
    </>
  );
};

export default CustomCursor;