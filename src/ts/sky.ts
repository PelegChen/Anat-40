import {
    Mesh,
    BackSide,
    SphereGeometry,
    ShaderMaterial,
    Color, Scene
} from 'three'

const SKY_COLOR = 0x999999
const GROUND_COLOR = 0x242424
const SKY_SIZE = 1000000

export function addSkyGradient(scene : Scene) {
    const vertexShader = `
      varying vec3 vWorldPosition;
            void main() {
                vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
                vWorldPosition = worldPosition.xyz;
                gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
            }`
    const fragmentShader = `
      uniform vec3 topColor;
            uniform vec3 bottomColor;
            varying vec3 vWorldPosition;
            void main() {
                float h = normalize( vWorldPosition).z;
                gl_FragColor = vec4( mix( bottomColor, topColor, max( h, 0.0 ) ), 1.0 );
            }`
    const uniforms = {
        topColor: { value: new Color(SKY_COLOR) },
        bottomColor: { value: new Color(GROUND_COLOR) }
    }
    const skyGeo = new SphereGeometry(SKY_SIZE, 32, 15)
    const skyMat = new ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader,
        side: BackSide
    })
    const sky = new Mesh(skyGeo, skyMat)
    scene.add(sky)
}
