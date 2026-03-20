import * as THREE from 'three';

const canvas = document.getElementById('hero-canvas');
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.domElement.style.pointerEvents = 'none';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 6);

const vertexShader = `
  uniform float uTime;
  uniform float uBreath;
  varying vec3 vNormal;
  varying float vFresnel;

  void main() {
    vNormal = normalize(normalMatrix * normal);

    vec3 pos = position * (1.0 + uBreath * 0.06);
    float edge = length(position) * 0.3;
    pos += normal * sin(edge * 8.0 + uTime * 0.5) * 0.015;

    vec3 viewDir = normalize(-vec3(modelViewMatrix * vec4(pos, 1.0)));
    vFresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 4.0);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  varying vec3 vNormal;
  varying float vFresnel;
  uniform float uTime;
  uniform float uBreath;

  void main() {
    vec3 obsidian    = vec3(0.02, 0.02, 0.03);
    vec3 rimColor    = vec3(0.25, 0.28, 0.35);
    vec3 glintColor  = vec3(0.6, 0.65, 0.75);

    float breathGlow = uBreath * 0.15;
    vec3 color = obsidian + rimColor * vFresnel * 0.8 + glintColor * pow(vFresnel, 6.0);
    color += glintColor * breathGlow;

    float alpha = 0.55 + vFresnel * 0.4 + breathGlow;

    gl_FragColor = vec4(color, alpha);
  }
`;

// FORMA DE OBSIDIANA — icosaedro con fracturas suaves
const geometry = new THREE.IcosahedronGeometry(1.7, 3);
const posAttr = geometry.attributes.position;
for (let i = 0; i < posAttr.count; i++) {
  const x = posAttr.getX(i);
  const y = posAttr.getY(i);
  const z = posAttr.getZ(i);
  const f = 1.0 + (Math.random() - 0.5) * 0.08;
  posAttr.setXYZ(i, x * f, y * f, z * f);
}
geometry.computeVertexNormals();

const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    uTime:   { value: 0 },
    uBreath: { value: 0 },
  },
  transparent: true,
  side: THREE.DoubleSide,
});

const crystal = new THREE.Mesh(geometry, material);
scene.add(crystal);

// WIREFRAME MUY SUTIL
const wireMat = new THREE.MeshBasicMaterial({
  color: 0x334455,
  wireframe: true,
  transparent: true,
  opacity: 0.04,
});
const wire = new THREE.Mesh(geometry, wireMat);
scene.add(wire);

const keyLight = new THREE.DirectionalLight(0xffffff, 5);
keyLight.position.set(4, 5, 4);
scene.add(keyLight);
const rimLight = new THREE.DirectionalLight(0x4455aa, 2);
rimLight.position.set(-4, -2, -3);
scene.add(rimLight);
scene.add(new THREE.AmbientLight(0x111122, 1.5));

let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;
let time = 0;
let rotationY = 0;
let rotationX = 0;
let rotSpeed = 0.008;

document.addEventListener('mousemove', e => {
  mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
  mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
});

function animate() {
  requestAnimationFrame(animate);
  time += 0.01;

  targetX += (mouseX - targetX) * 0.04;
  targetY += (mouseY - targetY) * 0.04;

  // Respiración — seno suave
  const breath = Math.sin(time * 0.6) * 0.5 + 0.5;
  material.uniforms.uBreath.value = breath;
  material.uniforms.uTime.value = time;

  // Rotación lenta — da un par de vueltas y casi para
  rotSpeed *= 0.998;
  if (rotSpeed < 0.001) rotSpeed = 0.001;
  rotationY += rotSpeed + targetX * 0.005;
  rotationX += targetY * 0.003;

  crystal.rotation.y = rotationY;
  crystal.rotation.x = rotationX;
  wire.rotation.y = rotationY;
  wire.rotation.x = rotationX;

  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});