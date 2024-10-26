varying vec2 vUv;
varying float vDistortion;
uniform float uTime;
uniform vec2 uMouse;

void main() {
  vUv = uv;
  
  // Create dynamic distortion based on mouse position
  vec3 pos = position;
  float dist = distance(uv, uMouse);
  float wave = sin(dist * 10.0 - uTime) * 0.1;
  
  // Apply smooth distortion
  vDistortion = wave * (1.0 - dist);
  pos.z += vDistortion * 5.0;
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}