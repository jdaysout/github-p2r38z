import * as THREE from 'three';

export class BackgroundEffect {
  private mesh: THREE.Mesh;
  private uniforms: { [key: string]: THREE.IUniform };
  private quality: 'low' | 'high';
  private mouseVelocity: THREE.Vector2;
  private lastMousePosition: THREE.Vector2;
  private interactionStrength: number;

  constructor(quality: 'low' | 'high' = 'high') {
    this.quality = quality;
    this.mouseVelocity = new THREE.Vector2(0, 0);
    this.lastMousePosition = new THREE.Vector2(0, 0);
    this.interactionStrength = 0;

    this.uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uMouseVelocity: { value: 0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uInteractionStrength: { value: 0 }
    };

    const geometry = new THREE.PlaneGeometry(50, 50, 32, 32);
    const material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: `
        varying vec2 vUv;
        uniform float uMouseVelocity;
        uniform vec2 uMouse;
        
        void main() {
          vUv = uv;
          vec3 pos = position;
          
          // Add subtle vertex displacement based on mouse velocity
          float dist = distance(uv, uMouse);
          float influence = smoothstep(0.5, 0.0, dist);
          pos.z += influence * uMouseVelocity * 2.0;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        uniform float uMouseVelocity;
        uniform vec2 uResolution;
        uniform float uInteractionStrength;
        varying vec2 vUv;

        float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
        }

        void main() {
          vec2 uv = gl_FragCoord.xy / uResolution.xy;
          vec2 mouse = uMouse * 0.5 + 0.5;
          
          // Enhanced void effect with mouse interaction
          float voidEffect = length(uv - mouse);
          voidEffect += sin(uTime * 0.5) * 0.1;
          
          // Dynamic grid based on mouse velocity
          vec2 grid = fract(uv * (30.0 + uMouseVelocity * 10.0));
          float gridLine = step(0.97 - uMouseVelocity * 0.1, grid.x) + 
                          step(0.97 - uMouseVelocity * 0.1, grid.y);
          
          // Reactive color based on interaction
          vec3 color = vec3(0.0);
          float glow = smoothstep(1.0, 0.0, voidEffect) * (0.15 + uInteractionStrength * 0.2);
          vec3 baseColor = vec3(0.345, 0.396, 0.949); // Primary color (0x5865F2)
          vec3 accentColor = vec3(1.0, 1.0, 1.0);
          color += mix(baseColor, accentColor, uInteractionStrength) * glow;
          
          // Enhanced grid lines with interaction
          float gridIntensity = 0.03 + uInteractionStrength * 0.05;
          color += vec3(gridLine) * gridIntensity;
          
          // Dynamic noise based on interaction
          float noise = random(uv + uTime * (0.01 + uInteractionStrength * 0.05)) * 
                       (0.02 + uInteractionStrength * 0.03);
          color += vec3(noise);
          
          // Reactive opacity
          float alpha = glow * (0.5 + uInteractionStrength * 0.3) + 
                       gridLine * (0.05 + uInteractionStrength * 0.1) + 
                       noise * 0.01;
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: false,
    });

    this.mesh = new THREE.Mesh(geometry, material);
  }

  getMesh(): THREE.Mesh {
    return this.mesh;
  }

  update(time: number, mouseX: number, mouseY: number): void {
    // Update time uniform
    this.uniforms.uTime.value = time;

    // Calculate mouse velocity
    const currentMouse = new THREE.Vector2(mouseX, mouseY);
    this.mouseVelocity.subVectors(currentMouse, this.lastMousePosition);
    const velocity = this.mouseVelocity.length();
    
    // Smooth velocity for better visual effect
    this.uniforms.uMouseVelocity.value += (velocity - this.uniforms.uMouseVelocity.value) * 0.1;
    
    // Update mouse position
    this.uniforms.uMouse.value.set(mouseX, mouseY);
    this.lastMousePosition.copy(currentMouse);

    // Update interaction strength
    const targetStrength = velocity > 0.01 ? 1 : 0;
    this.interactionStrength += (targetStrength - this.interactionStrength) * 0.1;
    this.uniforms.uInteractionStrength.value = this.interactionStrength;
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