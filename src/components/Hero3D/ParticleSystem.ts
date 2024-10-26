import * as THREE from 'three';

export class ParticleSystem {
  particles: THREE.Points;
  private positions: Float32Array;
  private velocities: Float32Array;

  constructor(count: number) {
    const geometry = new THREE.BufferGeometry();
    this.positions = new Float32Array(count * 3);
    this.velocities = new Float32Array(count * 3);

    // Initialize particles in a trail formation
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      this.positions[i3] = 0;
      this.positions[i3 + 1] = 0;
      this.positions[i3 + 2] = 0;

      this.velocities[i3] = (Math.random() - 0.5) * 0.1;
      this.velocities[i3 + 1] = (Math.random() - 0.5) * 0.1;
      this.velocities[i3 + 2] = 0;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0x5865F2,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    this.particles = new THREE.Points(geometry, material);
  }

  update(shipPosition: THREE.Vector3): void {
    const positions = this.particles.geometry.attributes.position.array as Float32Array;
    
    // Update particle positions
    for (let i = positions.length - 1; i >= 3; i -= 3) {
      positions[i] = positions[i - 3];
      positions[i - 1] = positions[i - 4];
      positions[i - 2] = positions[i - 5];
    }

    // Set the first particle to ship position
    positions[0] = shipPosition.x;
    positions[1] = shipPosition.y;
    positions[2] = shipPosition.z;

    // Add some randomness to particle movement
    for (let i = 0; i < positions.length; i += 3) {
      const i3 = i;
      positions[i3] += this.velocities[i3];
      positions[i3 + 1] += this.velocities[i3 + 1];
      
      // Reset velocities with small random values
      this.velocities[i3] = (Math.random() - 0.5) * 0.02;
      this.velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
    }

    this.particles.geometry.attributes.position.needsUpdate = true;
  }

  dispose(): void {
    if (this.particles.geometry) {
      this.particles.geometry.dispose();
    }
    if (this.particles.material instanceof THREE.Material) {
      this.particles.material.dispose();
    }
  }
}