import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import GUI from 'lil-gui' 
import { color } from 'three/tsl'
/**
 * Base
 */


/**
 * Debug
 */
const gui = new GUI(
    {
        width:400,
        title: 'Debug UI - Cube Tweaks',
        closeFolders: true
    }
)
const debugObject = {}
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */ 

debugObject.color = '#a778d8'

debugObject.spin = () =>
{
    gsap.to(mesh.rotation, {y: mesh.rotation.y + Math.PI * 2})
}

const cubeTweaks = gui.addFolder('Awsome Cube')
const colorTweaks = gui.addFolder('Awsome Color')
const geoTweaks = gui.addFolder('Awsome Geo')

const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
const material = new THREE.MeshBasicMaterial({ color: debugObject.color , wireframe: true})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

cubeTweaks
    .add(mesh.position,'y')
    .min(-3)
    .max(3)
    .step(0.01)
    .name('Elevation')

cubeTweaks
    .add(mesh, 'visible')

cubeTweaks
    .add(material, 'wireframe')

colorTweaks
    .addColor(debugObject, 'color').onChange(() => {material.color.set(debugObject.color)})

colorTweaks
    .add(debugObject, 'spin')


debugObject.subdivision = 2
debugObject.scale = 1


geoTweaks
    .add(debugObject, 'subdivision')
    .min(1)
    .max(20)
    .step(1)
    .onFinishChange(() =>{
        mesh.geometry = new THREE.BoxGeometry(
            debugObject.scale, debugObject.scale,debugObject.scale,
            debugObject.subdivision,debugObject.subdivision,debugObject.subdivision // Segments params
        )
    })

geoTweaks
    .add(debugObject, 'scale')
    .min(1)
    .max(10)
    .step(1)
    .onChange(() =>{
        mesh.geometry.dispose()
        mesh.geometry = new THREE.BoxGeometry(
            debugObject.scale, debugObject.scale,debugObject.scale,
            debugObject.subdivision,debugObject.subdivision,debugObject.subdivision 
        )
    })

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()