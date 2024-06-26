import './style.css'

import * as THREE from 'three'

const scene = new THREE.Scene();

// creat our sphere
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

const geometry =
    new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({ color: "#7dfb8e" });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const light = new THREE.PointLight(0xffffff, 20,40);
 light.position.set( 0,10,10);
scene.add(light);

//Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height);
camera.position.z = 10
scene.add(camera);


const canvas  = document.querySelector('.webgl') as HTMLCanvasElement
const renderer = new THREE.WebGLRenderer({
    canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);



window.addEventListener('resize', async() => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
   renderer.render(scene, camera);


})
