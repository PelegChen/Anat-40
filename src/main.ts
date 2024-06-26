import './style.css'

import * as THREE from 'three'

const scene = new THREE.Scene();

// creat our sphere

const geometry =
    new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({ color: "#7dfb8e" });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const light = new THREE.PointLight(0xffffff, 20,40);
 light.position.set( 0,10,10);
scene.add(light);

//Camera
const camera = new THREE.PerspectiveCamera(45, 800 / 600);
camera.position.z = 30
scene.add(camera);


const canvas  = document.querySelector('.webgl') as HTMLCanvasElement
const renderer = new THREE.WebGLRenderer({
    canvas
});
renderer.setSize(800, 600);
renderer.render(scene, camera);

