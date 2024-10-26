import { useCallback } from 'react';

export const useWebGLContext = () => {
  const clearWebGLContext = useCallback(async (container: HTMLElement) => {
    try {
      const existingCanvas = container.querySelector('canvas');
      if (existingCanvas) {
        const gl = existingCanvas.getContext('webgl') || existingCanvas.getContext('webgl2');
        if (gl) {
          const ext = gl.getExtension('WEBGL_lose_context');
          if (ext) {
            await new Promise<void>((resolve) => {
              ext.loseContext();
              existingCanvas.addEventListener('webglcontextlost', () => {
                resolve();
              }, { once: true });
            });
          }
        }
        container.removeChild(existingCanvas);
      }
    } catch (error) {
      console.warn('Error clearing WebGL context:', error);
    }
  }, []);

  const initializeWebGL = useCallback(async (container: HTMLElement) => {
    const canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    
    // Set initial size
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    
    container.appendChild(canvas);

    try {
      // Test WebGL support first
      const testCanvas = document.createElement('canvas');
      const testContext = testCanvas.getContext('webgl2') || testCanvas.getContext('webgl');
      if (!testContext) {
        throw new Error('WebGL not supported');
      }

      const contextAttributes: WebGLContextAttributes = {
        alpha: true,
        antialias: true,
        powerPreference: 'default', // Changed from 'high-performance' for better compatibility
        failIfMajorPerformanceCaveat: false, // Changed to false to allow fallback to software rendering
        preserveDrawingBuffer: false,
        desynchronized: true // Enable desynchronized hints for better performance
      };

      const gl = canvas.getContext('webgl2', contextAttributes) || 
                canvas.getContext('webgl', contextAttributes);

      if (!gl) {
        throw new Error('WebGL context creation failed');
      }

      return gl;
    } catch (error) {
      console.warn('WebGL initialization failed:', error);
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
      return null;
    }
  }, []);

  return {
    clearWebGLContext,
    initializeWebGL
  };
};