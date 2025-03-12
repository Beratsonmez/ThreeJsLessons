import * as THREE from 'three'
import { Wireframe } from 'three/examples/jsm/Addons.js'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const group = new THREE.Group()

scene.add(group)

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color:0xff0000, wireframe: true})
)
group.add(cube)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color:0x0000ff, wireframe: true})
)
cube2.position.x = 2
group.add(cube2)

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color:0x00ff00, wireframe: true})
)
cube3.position.x = -2
group.add(cube3)

// Axes Helper
const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    console.log(elapsedTime)

    cube.position.y = Math.sin(elapsedTime)
    cube.position.x = Math.cos(elapsedTime)
    cube.scale.y = Math.cos(elapsedTime)
    cube2.position.y = Math.cos(elapsedTime)
    cube2.rotation.y = Math.cos(elapsedTime)
    cube3.position.y = Math.cos(elapsedTime)
    cube3.rotation.y = -Math.cos(elapsedTime)
    
    camera.lookAt(cube.position)

    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()