import { useState, useEffect, useCallback } from 'react';

interface CursorPosition {
  x: number;
  y: number;
}

export const useCursorPosition = () => {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const lerp = useCallback((start: number, end: number, factor: number = 0.15): number => {
    const difference = end - start;
    if (Math.abs(difference) < 0.1) return end;
    return start + difference * factor;
  }, []);

  const updatePosition = useCallback((clientX: number, clientY: number) => {
    setPosition(prev => ({
      x: lerp(prev.x, clientX),
      y: lerp(prev.y, clientY)
    }));
  }, [lerp]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      updatePosition(e.clientX, e.clientY);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('interactive')
      );
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleElementHover);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleElementHover);
    };
  }, [isVisible, updatePosition]);

  return {
    position,
    isVisible,
    isHovering
  };
};