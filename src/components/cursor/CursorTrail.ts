import * as THREE from 'three';

export class CursorTrail {
  private scene: THREE.Scene;
  private camera: THREE.OrthographicCamera;
  private renderer: THREE.WebGLRenderer | null = null;
  private particles: THREE.Points;
  private uniforms: { [key: string]: THREE.IUniform };
  private isInitialized: boolean = false;
  private canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    
    const aspect = window.innerWidth / window.innerHeight;
    this.camera = new THREE.OrthographicCamera(
      -window.innerWidth / 2,
      window.innerWidth / 2,
      window.innerHeight / 2,
      -window.innerHeight / 2,
      1,
      1000
    );
    this.camera.position.z = 10;

    this.uniforms = {
      uSize: { value: 15.0 },
      uColor: { value: new THREE.Color('#5865F2') },
      uTime: { value: 0 }
    };

    this.particles = this.createParticles();
    this.scene.add(this.particles);
    
    this.initRenderer();
  }

  private initRenderer(): void {
    try {
      // Clear any existing context
      const existingContext = this.canvas.getContext('2d');
      if (existingContext) {
        existingContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }

      // Create new WebGL renderer
      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
        failIfMajorPerformanceCaveat: true
      });

      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.isInitialized = true;
    } catch (error) {
      console.warn('Failed to initialize WebGL renderer:', error);
      this.renderer = null;
      this.isInitialized = false;
    }
  }

  private createParticles(): THREE.Points {
    const particleCount = 50;
    const positions = new Float32Array(particleCount * 3);
    const opacities = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      opacities[i] = 1 - (i / particleCount);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('opacity', new THREE.BufferAttribute(opacities, 1));

    const material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: `
        attribute float opacity;
        varying float vOpacity;
        uniform float uSize;
        
        void main() {
          vOpacity = opacity;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = uSize * (1.0 / -mvPosition.z) * vOpacity;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying float vOpacity;
        
        void main() {
          float strength = distance(gl_PointCoord, vec2(0.5));
          strength = 1.0 - strength;
          strength = pow(strength, 3.0);
          
          vec3 color = mix(uColor, vec3(1.0), 0.2);
          gl_FragColor = vec4(color, strength * vOpacity * 0.5);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    return new THREE.Points(geometry, material);
  }

  public updatePositions(x: number, y: number): void {
    if (!this.isInitialized) return;

    const positions = this.particles.geometry.attributes.position.array as Float32Array;
    
    for (let i = positions.length - 3; i >= 3; i -= 3) {
      positions[i] = positions[i - 3];
      positions[i + 1] = positions[i - 2];
      positions[i + 2] = positions[i - 1];
    }

    positions[0] = x - window.innerWidth / 2;
    positions[1] = -y + window.innerHeight / 2;
    positions[2] = 0;

    this.particles.geometry.attributes.position.needsUpdate = true;
    this.uniforms.uTime.value += 0.01;
  }

  public render(): void {
    if (!this.isInitialized || !this.renderer) return;
    this.renderer.render(this.scene, this.camera);
  }

  public resize(): void {
    if (!this.isInitialized || !this.renderer) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.left = -width / 2;
    this.camera.right = width / 2;
    this.camera.top = height / 2;
    this.camera.bottom = -height / 2;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }

  public dispose(): void {
    if (!this.isInitialized) return;

    this.particles.geometry.dispose();
    (this.particles.material as THREE.Material).dispose();
    
    if (this.renderer) {
      this.renderer.dispose();
      this.renderer = null;
    }
    
    this.isInitialized = false;
  }

  public isValid(): boolean {
    return this.isInitialized && this.renderer !== null;
  }
}