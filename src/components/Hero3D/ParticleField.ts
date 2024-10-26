import * as THREE from 'three';

export class ParticleField {
  private particles: THREE.Points;
  private positions: Float32Array;
  private velocities: Float32Array;
  private originalPositions: Float32Array;
  private readonly particleCount: number;

  constructor(count: number = 1000) {
    this.particleCount = count;
    this.positions = new Float32Array(count * 3);
    this.velocities = new Float32Array(count * 3);
    this.originalPositions = new Float32Array(count * 3);

    // Initialize particles in a grid formation
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const spread = 50;
      
      // Create a grid pattern
      this.positions[i3] = (Math.random() - 0.5) * spread;
      this.positions[i3 + 1] = (Math.random() - 0.5) * spread;
      this.positions[i3 + 2] = (Math.random() - 0.5) * spread;

      // Store original positions for reset
      this.originalPositions[i3] = this.positions[i3];
      this.originalPositions[i3 + 1] = this.positions[i3 + 1];
      this.originalPositions[i3 + 2] = this.positions[i3 + 2];

      // Initialize velocities
      this.velocities[i3] = (Math.random() - 0.5) * 0.02;
      this.velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
      this.velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));

    // Create shader material for better performance and effects
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(0x5865F2) },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uInteractionStrength: { value: 0 }
      },
      vertexShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        uniform float uInteractionStrength;
        
        varying float vDistance;
        
        void main() {
          vec3 pos = position;
          
          // Add wave effect
          float wave = sin(uTime * 0.5 + pos.x * 0.2 + pos.y * 0.3) * 0.5;
          pos.z += wave;
          
          // Mouse interaction
          vec2 mousePos = uMouse * 50.0;
          float dist = distance(pos.xy, mousePos);
          float strength = 1.0 - clamp(dist / 10.0, 0.0, 1.0);
          pos.z += strength * uInteractionStrength * 5.0;
          
          vDistance = strength;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = mix(2.0, 4.0, strength);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying float vDistance;
        
        void main() {
          float alpha = 0.5 + vDistance * 0.5;
          
          // Create circular particles
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);
          float circle = 1.0 - smoothstep(0.45, 0.5, dist);
          
          gl_FragColor = vec4(uColor, alpha * circle);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.particles = new THREE.Points(geometry, material);
  }

  getMesh(): THREE.Points {
    return this.particles;
  }

  update(time: number, mouseX: number, mouseY: number): void {
    const material = this.particles.material as THREE.ShaderMaterial;
    material.uniforms.uTime.value = time;
    material.uniforms.uMouse.value.set(mouseX, mouseY);
    material.uniforms.uInteractionStrength.value = Math.sin(time * 2) * 0.5 + 0.5;
  }

  dispose(): void {
    this.particles.geometry.dispose();
    (this.particles.material as THREE.Material).dispose();
  }
}