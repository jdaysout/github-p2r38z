varying vec2 vUv;
varying float vDistortion;
uniform float uTime;
uniform vec3 uColor1;
uniform vec3 uColor2;

void main() {
  // Create smooth gradient between primary colors
  vec3 color = mix(uColor1, uColor2, vUv.y + sin(vUv.x * 5.0 + uTime) * 0.1);
  
  // Add subtle wave pattern
  float wave = sin((vUv.x + vUv.y) * 10.0 - uTime) * 0.5 + 0.5;
  color = mix(color, vec3(1.0), wave * 0.1);
  
  // Apply distortion-based glow
  float glow = abs(vDistortion) * 2.0;
  color += vec3(0.5, 0.7, 1.0) * glow;
  
  gl_FragColor = vec4(color, 1.0);
}