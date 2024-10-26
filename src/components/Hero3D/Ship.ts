import * as THREE from 'three';

export class Ship {
  mesh: THREE.Mesh;
  velocity: THREE.Vector2;
  target: THREE.Vector2;
  private engineGlow: THREE.PointLight;
  private lastPosition: THREE.Vector2;

  constructor() {
    // Create a more detailed ship geometry
    const geometry = new THREE.ConeGeometry(0.5, 1.5, 8);
    
    // Simplified material for better performance
    const material = new THREE.MeshStandardMaterial({
      color: 0x5865F2,
      metalness: 0.7,
      roughness: 0.3,
      emissive: 0x5865F2,
      emissiveIntensity: 0.5,
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.rotation.x = Math.PI / 2; // Correct initial orientation
    
    // Add engine glow light
    this.engineGlow = new THREE.PointLight(0x5865F2, 1, 3);
    this.mesh.add(this.engineGlow);
    this.engineGlow.position.set(0, -0.75, 0);

    this.velocity = new THREE.Vector2(0, 0);
    this.target = new THREE.Vector2(0, 0);
    this.lastPosition = new THREE.Vector2(0, 0);
  }

  update(mouseX: number, mouseY: number, deltaTime: number) {
    // More responsive controls
    const acceleration = 0.15;
    const friction = 0.92;
    const maxVelocity = 1.0;
    const deadzone = 0.005;

    // Calculate target position
    const targetX = mouseX * 10; // Reduced range for better control
    const targetY = mouseY * 8;  // Slightly reduced vertical range

    // Apply acceleration
    const dx = targetX - this.target.x;
    const dy = targetY - this.target.y;
    
    if (Math.abs(dx) > deadzone || Math.abs(dy) > deadzone) {
      this.velocity.x += dx * acceleration;
      this.velocity.y += dy * acceleration;
    }

    // Apply friction and clamp velocity
    this.velocity.multiplyScalar(friction);
    
    if (this.velocity.length() > maxVelocity) {
      this.velocity.normalize().multiplyScalar(maxVelocity);
    }

    // Update position
    this.target.add(this.velocity);

    // Update mesh position with smoother interpolation
    this.mesh.position.lerp(
      new THREE.Vector3(this.target.x, this.target.y, 0),
      0.3
    );

    // Calculate movement speed for effects
    const speed = this.velocity.length();
    
    // Update engine glow
    this.engineGlow.intensity = THREE.MathUtils.lerp(0.5, 2.0, speed / maxVelocity);

    // Update material glow
    if (this.mesh.material instanceof THREE.MeshStandardMaterial) {
      this.mesh.material.emissiveIntensity = THREE.MathUtils.lerp(
        0.3,
        1.0,
        speed / maxVelocity
      );
    }

    // Update rotation to face movement direction
    if (speed > deadzone) {
      const angle = Math.atan2(this.velocity.y, this.velocity.x);
      const targetRotationZ = angle - Math.PI / 2;
      
      // Smooth rotation
      const currentRotation = this.mesh.rotation.z;
      const rotationDiff = targetRotationZ - currentRotation;
      
      // Normalize angle difference
      const normalizedDiff = ((rotationDiff + Math.PI) % (Math.PI * 2)) - Math.PI;
      
      this.mesh.rotation.z += normalizedDiff * 0.1;
    }
  }

  dispose() {
    this.mesh.remove(this.engineGlow);
    this.engineGlow.dispose();
    if (this.mesh.material instanceof THREE.Material) {
      this.mesh.material.dispose();
    }
    if (this.mesh.geometry) {
      this.mesh.geometry.dispose();
    }
  }
}