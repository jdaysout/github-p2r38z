import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ArrowDown } from 'lucide-react';

interface CountdownLandingProps {
  onCountdownComplete: () => void;
}

const CountdownLanding: React.FC<CountdownLandingProps> = ({ onCountdownComplete }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<'interaction' | 'countdown' | 'transition'>('interaction');
  const [opacity, setOpacity] = useState(1);
  const [message, setMessage] = useState('INITIALIZE JB-VO INTERFACE');
  const [countdown, setCountdown] = useState(3);
  const [countdownOpacity, setCountdownOpacity] = useState(1);
  const [isFlashing, setIsFlashing] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Portal effect with enhanced glow
    const portalGeometry = new THREE.TorusGeometry(5, 0.5, 32, 100);
    const portalMaterial = new THREE.MeshPhongMaterial({
      color: 0xFFD700, // Gold color
      wireframe: true,
      emissive: 0xFFD700,
      emissiveIntensity: 0.8,
    });
    const portal = new THREE.Mesh(portalGeometry, portalMaterial);
    scene.add(portal);

    // Enhanced particle system
    const particleCount = window.innerWidth < 768 ? 500 : 1000;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const color = new THREE.Color();

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 50;
      positions[i + 1] = (Math.random() - 0.5) * 50;
      positions[i + 2] = (Math.random() - 0.5) * 50;

      color.setHSL(Math.random() * 0.1 + 0.1, 0.8, 0.8); // Gold-ish colors
      colors[i] = color.r;
      colors[i + 1] = color.g;
      colors[i + 2] = color.b;

      sizes[i / 3] = Math.random() * 2;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Enhanced lighting
    const ambientLight = new THREE.AmbientLight(0xFFD700, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xFFD700, 2, 100);
    pointLight.position.set(0, 0, 10);
    scene.add(pointLight);

    camera.position.z = 20;

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const handleClick = () => {
      if (phase === 'interaction') {
        setPhase('countdown');
        setMessage('JB-VO SYSTEM BREACH INITIATED...');
        
        let count = 3;
        const countdownInterval = setInterval(() => {
          count--;
          setCountdownOpacity(0);
          setTimeout(() => {
            setCountdown(count);
            setCountdownOpacity(1);
          }, 500);
          
          if (count === 0) {
            clearInterval(countdownInterval);
            setPhase('transition');
            setIsFlashing(true);
            
            setTimeout(() => {
              setOpacity(0);
              setTimeout(onCountdownComplete, 1000);
            }, 1500);
          }
        }, 1000);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    let time = 0;
    // Animation loop
    const animate = () => {
      const animationId = requestAnimationFrame(animate);
      time += 0.01;

      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;
      camera.position.x = targetX * 10;
      camera.position.y = targetY * 10;
      camera.lookAt(scene.position);

      portal.rotation.x += 0.005;
      portal.rotation.y += 0.005;
      const scale = 1 + Math.sin(time * 2) * 0.1;
      portal.scale.set(scale, scale, scale);

      renderer.render(scene, camera);

      return () => {
        cancelAnimationFrame(animationId);
      };
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      portalGeometry.dispose();
      portalMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
    };
  }, [phase, onCountdownComplete]);

  return (
    <div 
      className={`fixed inset-0 z-50 bg-background transition-all duration-1000 ${
        isFlashing ? 'flash-effect' : ''
      }`}
      style={{ opacity }}
    >
      <div ref={mountRef} className="absolute inset-0" />
      <style>
        {`
          @keyframes flash {
            0% { background: var(--background); }
            50% { background: #FFD700; }
            100% { background: var(--background); }
          }
          
          @keyframes hazardStripes {
            0% { background-position: 0 0; }
            100% { background-position: 50px 50px; }
          }
          
          .flash-effect {
            animation: flash 1s ease-out;
          }
          
          .countdown-number {
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .jbvo-text {
            color: #FF0000;
            text-shadow: 
              0 0 10px rgba(255, 0, 0, 0.5),
              0 0 20px rgba(255, 0, 0, 0.3),
              0 0 30px rgba(255, 0, 0, 0.2),
              2px 2px 2px rgba(0, 0, 0, 0.8);
            position: relative;
            z-index: 1;
            background: repeating-linear-gradient(
              45deg,
              #FF0000,
              #FF0000 10px,
              #000000 10px,
              #000000 20px
            );
            -webkit-background-clip: text;
            background-clip: text;
            animation: hazardStripes 20s linear infinite;
          }

          .sequence-text {
            color: #FF0000;
            text-shadow: 
              0 0 10px rgba(255, 0, 0, 0.5),
              0 0 20px rgba(255, 0, 0, 0.3),
              0 0 30px rgba(255, 0, 0, 0.2),
              2px 2px 2px rgba(0, 0, 0, 0.8);
          }
        `}
      </style>
      {phase === 'interaction' && (
        <div className="absolute inset-x-0 bottom-10 flex flex-col items-center gap-4">
          <ArrowDown className="w-8 h-8 text-[#FF0000] animate-bounce" />
          <div className="text-xl font-bold animate-pulse jbvo-text">
            {message}
          </div>
        </div>
      )}
      {phase === 'countdown' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="text-8xl font-bold sequence-text countdown-number"
            style={{ 
              opacity: countdownOpacity,
              transform: `scale(${countdownOpacity})`,
            }}
          >
            {countdown}
          </div>
        </div>
      )}
      {phase === 'transition' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-xl font-bold animate-pulse sequence-text">
            {message}
          </div>
        </div>
      )}
    </div>
  );
};

export default CountdownLanding;