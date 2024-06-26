// @ts-ignore
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {  Object3D, Object3DEventMap} from 'three';


import * as THREE from 'three'
// @ts-ignore
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene();

// creat our sphere
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

// const geometry = new THREE.SphereGeometry(3, 64, 64);
// const material = new THREE.MeshStandardMaterial({color: '#7dfb8e'});
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

const light = new THREE.PointLight(0xffffff, 200, 40);
light.position.set(0, 10, 10);
scene.add(light);

//Camera
const camera = new THREE.PerspectiveCamera(1 , sizes.width / sizes.height);
camera.position.z = 10
scene.add(camera);


const canvas = document.querySelector('.webgl') as HTMLCanvasElement

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Rederer
const renderer = new THREE.WebGLRenderer({
    canvas
});
renderer.setPixelRatio(2)
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

const loader = new GLTFLoader();
loader.load('/Daisy.glb', (gltf: { scene: Object3D<Object3DEventMap> }) => {
   console.log(gltf)
    // const mesh =
    //     new Mesh(gltf.scene, gltf.materials)
        scene.add(gltf.scene);
}, undefined, (error: any) => {
    console.error('An error happened', error);
});

window.addEventListener('resize', async () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
})

const loop = () => {
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(loop);

}
loop();


