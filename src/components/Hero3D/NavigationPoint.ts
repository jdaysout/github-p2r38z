import * as THREE from 'three';

export class NavigationPoint {
  mesh: THREE.Mesh;
  name: string;
  private initialPosition: THREE.Vector3;
  private glowMaterial: THREE.ShaderMaterial;
  private pulseStartTime: number | null = null;
  private pulseIntensity: number = 0;

  constructor(position: THREE.Vector3, name: string) {
    this.name = name;
    this.initialPosition = position.clone();

    const geometry = new THREE.OctahedronGeometry(0.8, 0);
    
    this.glowMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uDistance: { value: 1.0 },
        uColor: { value: new THREE.Color(0x5865F2) },
        uPulseIntensity: { value: 0.0 }
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform float uDistance;
        uniform vec3 uColor;
        uniform float uPulseIntensity;
        
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        void main() {
          float pulse = sin(uTime * 2.0) * 0.5 + 0.5;
          float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          
          vec3 color = mix(uColor, vec3(1.0), fresnel * 0.5);
          // Add pulse effect
          color += vec3(1.0) * uPulseIntensity;
          
          float alpha = (fresnel + pulse * 0.5) * (1.0 - smoothstep(0.0, 1.0, uDistance));
          alpha = mix(alpha, 1.0, uPulseIntensity * 0.5);
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });

    this.mesh = new THREE.Mesh(geometry, this.glowMaterial);
    this.mesh.position.copy(position);
  }

  pulse(): void {
    this.pulseStartTime = Date.now();
    this.pulseIntensity = 1.0;
  }

  update(time: number, index: number, shipPosition: THREE.Vector3): void {
    // Update position with floating animation
    const floatOffset = Math.sin(time * 0.001 + index) * 0.2;
    this.mesh.position.copy(this.initialPosition).add(new THREE.Vector3(0, floatOffset, 0));

    // Update rotation
    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.01;

    // Update shader uniforms
    const distance = shipPosition.distanceTo(this.mesh.position);
    this.glowMaterial.uniforms.uTime.value = time * 0.001;
    this.glowMaterial.uniforms.uDistance.value = Math.min(distance / 5, 1);

    // Update pulse effect
    if (this.pulseStartTime !== null) {
      const pulseElapsed = (Date.now() - this.pulseStartTime) / 1000;
      if (pulseElapsed < 1.0) {
        this.pulseIntensity = 1.0 - pulseElapsed;
      } else {
        this.pulseIntensity = 0;
        this.pulseStartTime = null;
      }
    }
    this.glowMaterial.uniforms.uPulseIntensity.value = this.pulseIntensity;
  }

  dispose(): void {
    if (this.mesh.geometry) {
      this.mesh.geometry.dispose();
    }
    if (this.mesh.material instanceof THREE.Material) {
      this.mesh.material.dispose();
    }
  }
}