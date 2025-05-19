import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
/**
 * Base
 */

// Cursor
const cursor ={
    x: 0,
    y: 0
}
console.log(OrbitControls)
window.addEventListener('mousemove', (event) =>
{
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = - (event.clientY /sizes.height - 0.5)

    console.log(event.clientX,event.clientY)
})

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 3
// camera.lookAt(mesh.position)
scene.add(camera)

// Controls
const control = new OrbitControls(camera, canvas)
// control.target.y = 2
// control.update()
// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // mesh.rotation.y = elapsedTime;
    // camera.position.x = Math.sin(cursor.x * Math.PI*2) *2
    // camera.position.z = Math.cos(cursor.x * Math.PI *2) *2
    // camera.position.y = cursor.y * 5
    // camera.lookAt(new THREE.Vector3())
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()