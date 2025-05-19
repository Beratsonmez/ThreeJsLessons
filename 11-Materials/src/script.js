import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

/**
 * Debug
 */
const gui = new GUI()

/**
 * Environment map
 */
const rgbeLoader = new RGBELoader()
rgbeLoader.load('./textures/environmentMap/2k.hdr', (environmentMap) =>
{
    console.log(environmentMap)
})

/**
 * Base
 */

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

rgbeLoader.load('./textures/environmentMap/2k.hdr', (environmentMap) =>
{
    environmentMap.mapping = THREE.EquirectangularReflectionMapping

    scene.background = environmentMap
    scene.environment = environmentMap
})

//DOOR
const doorColorTexture = textureLoader.load('./textures/door/color.jpg')
doorColorTexture.colorSpace = THREE.SRGBColorSpace
const doorAmbientOcclusionTexture = textureLoader.load('./textures/door/ambientOcclusion.jpg')
const doorAlphaTexture = textureLoader.load('./textures/door/alpha.jpg')
const doorHeightTexture = textureLoader.load('./textures/door/height.jpg')
const doorMetalnessTexture = textureLoader.load('./textures/door/metalness.jpg')
const doorNormalTexture = textureLoader.load('./textures/door/normal.jpg')
const doorRoughnessTexture = textureLoader.load('./textures/door/roughness.jpg')

//Matcaps
const matcapTexture =  textureLoader.load('./textures/matcaps/8.png')
matcapTexture.colorSpace = THREE.SRGBColorSpace
//Gradients
const gradientTexture = textureLoader.load('./textures/gradients/3.jpg')

/**
 * Object
 */
// //MehsBasicMaterial

// const material = new THREE.MeshBasicMaterial()
// material.map = doorColorTexture
// material.color = new THREE.Color(0x00ff00)
// material.wireframe = true
// material.transparent = true
// material.opacity = 0.3
// material.alphaMap = doorAlphaTexture
// material.side = THREE.DoubleSide

// MeshNormalMaterial
// const material = new THREE.MeshNormalMaterial()
// material.wireframe = false
// material.flatShading = true
// material.side = THREE.DoubleSide

// MeshMatcapMaterial
// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture
// material.side = THREE.DoubleSide

// MeshDepthMaterial
// const material = new THREE.MeshDepthMaterial()

// MeshLambertMaterial
// const material = new THREE.MeshLambertMaterial()

// MeshPhongMaterial
// const material = new THREE.MeshPhongMaterial()

// MeshToonMaterial
// const material = new THREE.MeshToonMaterial()
// material.gradientMap = gradientTexture

// // MeshStandartMaterial
// const material = new THREE.MeshStandardMaterial()
// material.metalness = 1
// material.roughness = 1
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.1
// material.normalMap = doorNormalTexture
// material.alphaMap = doorAlphaTexture
// material.transparent = true
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// // material.side = THREE.DoubleSide

// gui.add(material,'roughness')
//     .min(0)
//     .max(1)
//     .step(0.0001)
// gui.add(material,'metalness')
//     .min(0)
//     .max(1)
//     .step(0.0001)

// MeshStandartMaterial
const material = new THREE.MeshPhysicalMaterial()
material.metalness = 0
material.roughness = 0
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.1
// material.normalMap = doorNormalTexture
// material.alphaMap = doorAlphaTexture
// material.transparent = true
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture

//ClearCoat
// material.clearcoat = 1
// material.clearcoatRoughness = 0

//Sheen
// material.sheen = 1
// material.sheenRoughness = 0.25
// material.sheenColor.set(1,1,1)

//Iridescence
// material.iridescence = 1
// material.iridescenceIOR = 1
// material.iridescenceThicknessRange = [100,800]
material.side = THREE.DoubleSide

//Transmission
material.transmission = 1
material.ior = 1.5
material.thickness = 0.5

gui.add(material,'transmission')
    .min(0)
    .max(1)
    .step(0.0001)
    gui.add(material,'ior')
    .min(1)
    .max(10)
    .step(0.0001)
    gui.add(material,'thickness')
    .min(1)
    .max(10)
    .step(0.0001)

gui.add(material,'roughness')
    .min(0)
    .max(1)
    .step(0.0001)
gui.add(material,'metalness')
    .min(0)
    .max(1)
    .step(0.0001)
// gui.add(material,'sheen')
//     .min(0)
//     .max(1)
//     .step(0.0001)
// gui.add(material,'iridescence')
//     .min(0)
//     .max(1)
//     .step(0.0001)
//     gui.add(material,'iridescenceIOR')
//     .min(0)
//     .max(1)
//     .step(0.0001)
//     gui.add(material.iridescenceThicknessRange, '0')
//     .min(1)
//     .max(1000)
//     .step(1)
//     gui.add(material.iridescenceThicknessRange, '1')
//     .min(1)
//     .max(1000)
//     .step(1)

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1,1),
    material
)

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5,64,64),
    material
)
sphere.position.x = -2

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 64, 128),
    material
)

torus.position.x = 2

scene.add(plane,torus,sphere)

/**
 * Lights
 */
// const ambientLight = new THREE.AmbientLight(0xffffff,1)
// scene.add(ambientLight)

// const pointLight = new THREE.PointLight(0xffffff,50)
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4
// scene.add(pointLight)
// gui.add(pointLight,'intensity')
//     .min(0)
//     .max(100)
//     .step(1)



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

    //Update Object
    sphere.rotation.y = 0.1 * elapsedTime
    plane.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = -0.15 * elapsedTime
    plane.rotation.x = -0.15 * elapsedTime
    torus.rotation.x = -0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()