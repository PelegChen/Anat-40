// @ts-ignore
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import { Object3D, Object3DEventMap} from 'three';
// @ts-ignore
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene();

scene.background = new THREE.Color('#facbcb');
// creat our sphere
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};


const light = new THREE.AmbientLight(0xffffff, 2 );

light.position.set(0, 2, 2);


scene.add(light);
// scene.add(ambientLight);

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
const file =  'Gingerbread House.glb'// '/Gingerbread House.glb'
loader.load(file, (gltf: { scene: Object3D<Object3DEventMap> }) => {
    console.log(gltf)
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


