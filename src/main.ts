import './style.css'

import * as THREE from 'three'

const scene = new THREE.Scene();

// creat our sphere

const geometry =
    new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({ color: "#00ff1a" });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const light =
    new THREE.PointLight(0xffffff, 30, 0);
 light.position.set( 0,10,10);
scene.add(light);

//Camera
const camera = new THREE.PerspectiveCamera(45, 800 / 600,0.1, 100);
camera.position.z = 9
scene.add(camera);


const canvas  = document.querySelector('.webgl') as HTMLCanvasElement
const renderer = new THREE.WebGLRenderer({
    canvas
});
renderer.setSize(800, 600);
renderer.render(scene, camera);

