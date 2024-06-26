// @ts-ignore
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {Object3D, Object3DEventMap, Scene} from 'three';



const loader = new GLTFLoader();
export const scene = new Scene();
loader.load('/Daisy.glb', (gltf: { scene: Object3D<Object3DEventMap>; }) => {
    scene.add(gltf.scene);
}, undefined, (error: any) => {
    console.error('An error happened', error);
});
