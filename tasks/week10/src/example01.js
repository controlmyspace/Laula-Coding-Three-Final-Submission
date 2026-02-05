import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("threejs_animation").appendChild(renderer.domElement);

// Add a simple white light to illuminate the scene
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

// Create a simple checkered texture
const canvas = document.createElement('canvas');
canvas.width = 64;
canvas.height = 64;
const ctx = canvas.getContext('2d');
ctx.fillStyle = '#ff00ff';
ctx.fillRect(0, 0, 64, 64);
ctx.fillStyle = '#ffffff';
ctx.fillRect(0, 0, 32, 32);
ctx.fillRect(32, 32, 32, 32);
const texture = new THREE.CanvasTexture(canvas);

// Create cube with texture (note: changed to MeshStandardMaterial for lighting)
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({ map: texture });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5

const animate = function () {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();