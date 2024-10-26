import * as THREE from 'three';

export class CursorManager {
  private scene: THREE.Scene;
  private camera: THREE.OrthographicCamera;
  private renderer: THREE.WebGLRenderer | null = null;
  private particles: THREE.Points;
  private uniforms: { [key: string]: THREE.IUniform };
  private isInitialized: boolean = false;
  private canvas: HTMLCanvasElement;
  private positions: Float32Array;
  private readonly particleCount: number = 50;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    
    // Setup orthographic camera
    this.camera = new THREE.OrthographicCamera(
      -window.innerWidth / 2,
      window.innerWidth / 2,
      window.innerHeight / 2,
      -window.innerHeight / 2,
      1,
      1000
    );
    this.camera.position.z = 10;

    // Initialize uniforms
    this.uniforms = {
      uSize: { value: 15.0 },
      uColor: { value: new THREE.Color('#5865F2') },
      uTime: { value: 0 }
    };

    // Initialize positions array
    this.positions = new Float32Array(this.particleCount * 3);
    
    // Create and add particles
    this.particles = this.createParticles();
    this.scene.add(this.particles);
    
    // Initialize renderer
    this.initRenderer();
  }

  private initRenderer(): void {
    try {
      // Force context loss on any existing WebGL context
      const gl = this.canvas.getContext('webgl') || this.canvas.getContext('webgl2');
      if (gl) {
        const ext = gl.getExtension('WEBGL_lose_context');
        if (ext) {
          ext.loseContext();
          // Wait for context to be lost before creating new renderer
          setTimeout(() => this.createRenderer(), 100);
        } else {
          this.createRenderer();
        }
      } else {
        this.createRenderer();
      }
    } catch (error) {
      console.warn('WebGL initialization failed:', error);
      this.renderer = null;
      this.isInitialized = false;
    }
  }

  private createRenderer(): void {
    try {
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
      console.warn('Failed to create WebGL renderer:', error);
      this.renderer = null;
      this.isInitialized = false;
    }
  }

  private createParticles(): THREE.Points {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));

    const material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: `
        uniform float uSize;
        
        void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = uSize * (1.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uTime;
        
        void main() {
          float strength = distance(gl_PointCoord, vec2(0.5));
          strength = 1.0 - strength;
          strength = pow(strength, 3.0);
          
          vec3 color = mix(uColor, vec3(1.0), 0.2);
          float alpha = strength * 0.5 * (1.0 + sin(uTime * 2.0) * 0.2);
          gl_FragColor = vec4(color, alpha);
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

    // Update particle positions with trail effect
    for (let i = this.positions.length - 3; i >= 3; i -= 3) {
      this.positions[i] = this.positions[i - 3];
      this.positions[i + 1] = this.positions[i - 2];
      this.positions[i + 2] = this.positions[i - 1];
    }

    // Add new position
    this.positions[0] = x - window.innerWidth / 2;
    this.positions[1] = -y + window.innerHeight / 2;
    this.positions[2] = 0;

    this.particles.geometry.attributes.position.needsUpdate = true;
    this.uniforms.uTime.value += 0.016;
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

    if (this.particles) {
      this.particles.geometry.dispose();
      (this.particles.material as THREE.Material).dispose();
    }
    
    if (this.renderer) {
      this.renderer.forceContextLoss?.();
      this.renderer.dispose();
      this.renderer = null;
    }
    
    this.isInitialized = false;
  }

  public isValid(): boolean {
    return this.isInitialized && this.renderer !== null;
  }
}