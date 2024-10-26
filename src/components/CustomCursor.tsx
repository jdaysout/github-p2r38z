import React, { useEffect, useRef } from 'react';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const isVisible = useRef(false);
  const rafId = useRef<number>();
  const mousePosition = useRef({ x: 0, y: 0 });
  const cursorPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Improved lerp function with clamping for smoother movement
    const lerp = (start: number, end: number, factor: number) => {
      const difference = end - start;
      if (Math.abs(difference) < 0.1) return end;
      return start + difference * factor;
    };

    const updateCursorPosition = () => {
      if (!cursor) return;

      // Smoother cursor movement with optimized lerp
      cursorPosition.current.x = lerp(
        cursorPosition.current.x,
        mousePosition.current.x,
        0.2
      );
      cursorPosition.current.y = lerp(
        cursorPosition.current.y,
        mousePosition.current.y,
        0.2
      );

      // Use transform3d for hardware acceleration
      cursor.style.transform = `translate3d(${cursorPosition.current.x}px, ${cursorPosition.current.y}px, 0)`;
      
      rafId.current = requestAnimationFrame(updateCursorPosition);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible.current) {
        cursor.style.opacity = '1';
        isVisible.current = true;
      }

      // Update mouse position with viewport offset
      mousePosition.current.x = e.clientX;
      mousePosition.current.y = e.clientY;

      // Start animation if not already running
      if (!rafId.current) {
        rafId.current = requestAnimationFrame(updateCursorPosition);
      }
    };

    const onMouseLeave = () => {
      cursor.style.opacity = '0';
      isVisible.current = false;
    };

    const onMouseEnter = () => {
      cursor.style.opacity = '1';
      isVisible.current = true;
      
      // Initialize cursor position to prevent jumping
      mousePosition.current.x = cursorPosition.current.x = window.innerWidth / 2;
      mousePosition.current.y = cursorPosition.current.y = window.innerHeight / 2;
    };

    const onMouseDown = () => cursor.classList.add('clicking');
    const onMouseUp = () => cursor.classList.remove('clicking');

    const onElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('interactive')
      ) {
        cursor.classList.add('hovering');
      }
    };

    const onElementLeave = () => cursor.classList.remove('hovering');

    // Add event listeners with passive flag for better performance
    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseover', onElementHover);
    document.addEventListener('mouseout', onElementLeave);

    // Initialize cursor position
    mousePosition.current.x = cursorPosition.current.x = window.innerWidth / 2;
    mousePosition.current.y = cursorPosition.current.y = window.innerHeight / 2;

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', onElementHover);
      document.removeEventListener('mouseout', onElementLeave);
      
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return (
    <div 
      ref={cursorRef} 
      className="custom-cursor" 
      style={{ 
        opacity: 0,
        transform: 'translate3d(0px, 0px, 0)',
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        pointerEvents: 'none',
        position: 'fixed',
        zIndex: 9999,
        top: 0,
        left: 0
      }} 
    />
  );
};

export default CustomCursor;