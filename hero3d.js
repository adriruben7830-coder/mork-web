import * as THREE from 'https://unpkg.com/three@0.157.0/build/three.module.js';

const canvas = document.getElementById('hero-canvas');
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.domElement.style.pointerEvents = 'none';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 6);

// FORMA LÍQUIDA — icosaedro de alta resolución con vértices animados
const geometry = new THREE.IcosahedronGeometry(1.8, 6);
const positionAttribute = geometry.attributes.position;
const originalPositions = positionAttribute.array.slice();

const material = new THREE.MeshPhysicalMaterial({
  color: 0x222222,
  metalness: 0.9,
  roughness: 0.3,
  reflectivity: 0.5,
  clearcoat: 0.5,
  clearcoatRoughness: 0.3,
  transparent: true,
  opacity: 0.4,
  wireframe: false,
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// LUCES DRAMÁTICAS
const keyLight = new THREE.DirectionalLight(0xffffff, 6);
keyLight.position.set(4, 4, 4);
scene.add(keyLight);

const rimLight = new THREE.DirectionalLight(0x333333, 2);
rimLight.position.set(-4, -2, -4);
scene.add(rimLight);

const fillLight = new THREE.DirectionalLight(0xffffff, 1);
fillLight.position.set(0, -4, 2);
scene.add(fillLight);

scene.add(new THREE.AmbientLight(0x111111, 2));

// MOUSE
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
  mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

let time = 0;

function animate() {
  requestAnimationFrame(animate);
  time += 0.008;

  // DEFORMACIÓN LÍQUIDA — cada vértice se mueve con ondas de seno
  for (let i = 0; i < positionAttribute.count; i++) {
    const ox = originalPositions[i * 3];
    const oy = originalPositions[i * 3 + 1];
    const oz = originalPositions[i * 3 + 2];

    const noise =
      Math.sin(ox * 2.5 + time) * 0.12 +
      Math.sin(oy * 2.5 + time * 1.3) * 0.12 +
      Math.sin(oz * 2.5 + time * 0.9) * 0.12;

    positionAttribute.setXYZ(
      i,
      ox + ox * noise,
      oy + oy * noise,
      oz + oz * noise
    );
  }
  positionAttribute.needsUpdate = true;
  geometry.computeVertexNormals();

  // ROTACIÓN SUAVE + MOUSE
  targetX += (mouseX - targetX) * 0.03;
  targetY += (mouseY - targetY) * 0.03;

  mesh.rotation.y += 0.003 + targetX * 0.005;
  mesh.rotation.x += 0.001 + targetY * 0.005;

  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});