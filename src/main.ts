import './style.css'

import * as THREE from 'three'

const scene = new THREE.Scene();

// creat our sphere

const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//Camera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z(20)
scene.add(camera);

const canvas  = document.querySelector('.webgl') as HTMLCanvasElement
const renderer = new THREE.WebGLRenderer({
    canvas
});

renderer.render(scene, camera);

