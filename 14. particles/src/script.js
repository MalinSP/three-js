import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const particleTexture = textureLoader.load('/textures/particles/2.png')

// Particles

// Geometry
// const particlesGeometry = new THREE.SphereGeometry(1, 32, 32)
const particlesGeometry = new THREE.BufferGeometry()
const count = 20000
const positions = new Float32Array(count * 3)
const colors = new Float32Array(count * 3)

for (let i = 0; i < count * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 10
  colors[i] = Math.random()
}
particlesGeometry.setAttribute(
  'position',
  new THREE.BufferAttribute(positions, 3)
)
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

//console.log(particlesGeometry.attributes.position.array) - particles positions 3 by 3

// Material
const particlesMaterial = new THREE.PointsMaterial()
particlesMaterial.size = 0.1
particlesMaterial.sizeAttenuation = true
//particlesMaterial.color = new THREE.Color('#ff88cc')
// particlesMaterial.map = particleTexture // see borders
particlesMaterial.transparent = true
particlesMaterial.alphaMap = particleTexture // also see borders

//particlesMaterial.alphaTest = 0.001 // The alphaTest is a value between 0 and 1 that enables the WebGL to know when not to render the pixel according to that pixel's transparency. By default, the value is 0 meaning that the pixel will be rendered anyway. If we use a small value such as 0.001, the pixel won't be rendered if the alpha is 0

//particlesMaterial.depthTest = false // When drawing, the WebGL tests if what's being drawn is closer than what's already drawn. That is called depth testing and can be deactivated (you can comment the alphaTest):
//deactivating the depth testing might create bugs if you have other objects in your scene or particles with different colors. The particles might be drawn as if they were above the rest of the scene.

particlesMaterial.depthWrite = false // now the points don't see behind the cube //As we said, the WebGL is testing if what's being drawn is closer than what's already drawn. The depth of what's being drawn is stored in what we call a depth buffer. Instead of not testing if the particle is closer than what's in this depth buffer, we can tell the WebGL not to write particles in that depth buffer

particlesMaterial.blending = THREE.AdditiveBlending // Currently, the WebGL draws the pixels one on top of the other.
//By changing the blending property, we can tell the WebGL not only to draw the pixel, but also to add the color of that pixel to the color of the pixel already drawn. That will have a saturation effect that can look amazing.
//To test that, simply change the blending property to THREE.AdditiveBlending (keep the depthWrite property): //impact perfomance

particlesMaterial.vertexColors = true

//Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)

// const cube = new THREE.Mesh(
//   new THREE.BoxGeometry(),
//   new THREE.MeshBasicMaterial()
// )
// scene.add(cube)

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

window.addEventListener('resize', () => {
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
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  //Update particles
  //particles.rotation.y = elapsedTime * 0.02

  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    const x = particlesGeometry.attributes.position.array[i3 + 0]
    particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(
      elapsedTime + x
    ) // bad for performance
  }
  // THREE need to be notified when a geometry attribute changes
  particlesGeometry.attributes.position.needsUpdate = true

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
