// @ts-ignore
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import {AmbientLight, Object3D, Object3DEventMap} from 'three';
// @ts-ignore
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene();

// creat our sphere
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};


const light = new THREE.PointLight(0xffffff, 200, 40);
light.position.set(0, 10, 10);

const lights = new THREE.PointLight(0xffffff, 1);
const ambientLight = new AmbientLight(0xFFFFFF);
ambientLight.intensity = 50;
scene.add(light);
scene.add(lights);
scene.add(ambientLight);

//Camera
const camera = new THREE.PerspectiveCamera(2, sizes.width / sizes.height);
camera.position.z = 10
camera.position.y = 0
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
loader.load('/Gingerbread House.glb', (gltf: { scene: Object3D<Object3DEventMap> }) => {
    gltf.scene.position.y = -0.09;
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


