import * as THREE from 'three';
import { ParticleField } from './ParticleField';

interface SceneOptions {
  particleCount: number;
  quality: 'low' | 'high';
  context?: WebGLRenderingContext | WebGL2RenderingContext | null;
}

export class Scene {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer | null = null;
  private particleField: ParticleField | null = null;
  private clock: THREE.Clock;
  private mousePosition: THREE.Vector2;
  private targetMousePosition: THREE.Vector2;
  private quality: 'low' | 'high';
  private animationFrameId: number | null = null;
  private isDisposed: boolean = false;

  constructor(container: HTMLDivElement, options: SceneOptions) {
    if (!container) {
      throw new Error('Container element not found');
    }

    this.quality = options.quality;
    this.clock = new THREE.Clock();
    this.scene = new THREE.Scene();
    this.mousePosition = new THREE.Vector2(0, 0);
    this.targetMousePosition = new THREE.Vector2(0, 0);

    // Initialize camera with responsive FOV
    const fov = window.innerWidth < 768 ? 75 : 60;
    this.camera = new THREE.PerspectiveCamera(
      fov,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = window.innerWidth < 768 ? 25 : 20;

    try {
      // Test WebGL support first
      const testCanvas = document.createElement('canvas');
      const testContext = testCanvas.getContext('webgl2') || testCanvas.getContext('webgl');
      if (!testContext) {
        throw new Error('WebGL not supported');
      }

      const contextAttributes: WebGLContextAttributes = {
        alpha: true,
        antialias: this.quality === 'high',
        powerPreference: 'default',
        failIfMajorPerformanceCaveat: false,
        preserveDrawingBuffer: false,
        desynchronized: true
      };

      this.renderer = new THREE.WebGLRenderer({
        canvas: container.querySelector('canvas') || undefined,
        context: options.context as WebGLRenderingContext,
        ...contextAttributes
      });

      if (!this.renderer) {
        throw new Error('Failed to create WebGL renderer');
      }

      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.setSize(window.innerWidth, window.innerHeight);

      if (!container.querySelector('canvas')) {
        container.appendChild(this.renderer.domElement);
      }

      this.setupScene(options.particleCount);
      this.animate();
    } catch (error) {
      console.warn('WebGL initialization failed:', error);
      throw error;
    }
  }

  private setupScene(particleCount: number): void {
    this.particleField = new ParticleField(particleCount);
    this.scene.add(this.particleField.getMesh());

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);
  }

  public handleMouseMove(event: MouseEvent | Touch): void {
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = -(event.clientY / window.innerHeight) * 2 + 1;
    this.targetMousePosition.set(x, y);
  }

  public handleResize(): void {
    if (!this.renderer || !this.camera) return;

    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  private animate = (): void => {
    if (this.isDisposed || !this.renderer) return;

    const time = this.clock.getElapsedTime();

    // Smooth mouse movement
    this.mousePosition.lerp(this.targetMousePosition, 0.1);

    // Update particle field
    if (this.particleField) {
      this.particleField.update(time, this.mousePosition.x, this.mousePosition.y);
    }

    this.renderer.render(this.scene, this.camera);
    this.animationFrameId = requestAnimationFrame(this.animate);
  };

  public dispose(): void {
    this.isDisposed = true;

    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }

    if (this.particleField) {
      this.particleField.dispose();
    }

    if (this.renderer) {
      this.renderer.dispose();
      const canvas = this.renderer.domElement;
      canvas.parentElement?.removeChild(canvas);
    }

    this.scene.clear();
  }
}