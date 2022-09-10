import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
  width: 800,
  height: 600,
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3.2
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

//==================
//Time
// let time = Date.now()
// console.log(time)
//==================

// Clock
//const clock = new THREE.Clock()
// console.log(clock)

// Animation
gsap.to(mesh.position, { duration: 1, delay: 1, x: -2 })

const tick = () => {
  // Clock
  // const elapsedTime = clock.getElapsedTime() //will return how many seconds have passed since the Clock was created.
  //   console.log(elapsedTime)

  // Update values
  //mesh.position.y = Math.sin(elapsedTime) // also camera.position
  //mesh.position.x = Math.cos(elapsedTime) // also camera.position
  //camera.lookAt(mesh.position)
  //   mesh.position.y = elapsedTime
  //   mesh.rotation.y = elapsedTime * Math.PI * 2 // one rotation per second

  //Render
  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}
tick()

//==================
// const tick = () => {
//   //==================
//   //Time
//   //   const currentTime = Date.now()
//   //   const deltaTime = currentTime - time
//   //   time = currentTime
//   //console.log(deltaTime)
//   //   console.log(time)
//   //Update objects
//   //   mesh.position.x -= 0.01
//   //   mesh.position.y -= 0.01
//   //==================
//   //   mesh.rotation.y += 0.0002 * deltaTime
//   //==================

//   //Render
//   renderer.render(scene, camera)

//   window.requestAnimationFrame(tick)
// }
// tick()
//==================
