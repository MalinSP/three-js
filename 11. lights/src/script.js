import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'

//Minimal cost light for performance ambientLight and HemisphereLight
//Moderate cost - DirectionalLight and PointLight
//High cost - spotlight, rectAreaLight

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
 * Lights
 */
// illuminates all objects in the scene equally.
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5) //color, intensity
// const pointLight = new THREE.PointLight(0xffffff, 0.5)
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4
// scene.add(pointLight)
// ambientLight.color = new THREE.Color()
//ambientLight.intensity = 0.7
gui
  .add(ambientLight, 'intensity')
  .min(0)
  .max(1)
  .step(0.01)
  .name('ambientIntensity')
scene.add(ambientLight)

//============================ Directional light
// sun-like effect as if the sun rays were travelling in parallel. by default light coming by arrow down Y
const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.3)
directionalLight.position.set(1, 0.25, 0)
gui
  .add(directionalLight, 'intensity')
  .min(0)
  .max(1)
  .step(0.01)
  .name('directionalIntensity')
scene.add(directionalLight)

//============================ Hemisphere light
// similar to Ambient but with different color from the sky than the color coming from the ground, first - top color, sec - bottom color
const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3)
gui
  .add(hemisphereLight, 'intensity')
  .min(0)
  .max(1)
  .step(0.01)
  .name('hemisphereIntensity')

scene.add(hemisphereLight)

//============================ Point light
//like a lighter, light starts at an infinitely small point and spreads uniformly in every directions. By default doesn't fade //distance and decay
const pointLight = new THREE.PointLight(0xff9000, 0.5, 10, 2)
pointLight.position.set(1, -0.5, 1)
scene.add(pointLight)

//============================ React area light
// works like big rectangle lights you can see on the photoshoot set. Mix between directional light and a diffuse light //color, intensity, width, height. only works with meshStandardMaterial and MeshPhysicalMaterial
const reactAreaLight = new THREE.RectAreaLight(0x4e00ff, 3, 1, 1)
reactAreaLight.position.set(-1.5, 0, 1.5)
reactAreaLight.lookAt(new THREE.Vector3()) // look at the center of the scene
scene.add(reactAreaLight)

//============================ Spot light
//it's a cone of light starting at point and oriented in a direction
// color, intensity, distance, angle, penumbra, decay
const spotLight = new THREE.SpotLight(0x78ff00, 0.5, 10, Math.PI * 0.1, 0.25, 1)
spotLight.position.set(0, 2, 3)
spotLight.target.position.x = -0.75
scene.add(spotLight.target)
scene.add(spotLight)

// Helpers
const hemisphereLightHelper = new THREE.HemisphereLightHelper(
  hemisphereLight,
  0.2
)
scene.add(hemisphereLightHelper)

const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight,
  0.1
)
scene.add(directionalLightHelper)

const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2)
scene.add(pointLightHelper)

const spotLightHelper = new THREE.SpotLightHelper(spotLight)
scene.add(spotLightHelper)

window.requestAnimationFrame(() => {
  spotLightHelper.update()
})

const rectAreaLightHelper = new RectAreaLightHelper(reactAreaLight)
scene.add(rectAreaLightHelper)
/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

// Objects
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material)
sphere.position.x = -1.5

const cube = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.75), material)

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 32, 64),
  material
)
torus.position.x = 1.5

const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material)
plane.rotation.x = -Math.PI * 0.5
plane.position.y = -0.65

scene.add(sphere, cube, torus, plane)

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

  // Update objects
  sphere.rotation.y = 0.1 * elapsedTime
  cube.rotation.y = 0.1 * elapsedTime
  torus.rotation.y = 0.1 * elapsedTime

  sphere.rotation.x = 0.15 * elapsedTime
  cube.rotation.x = 0.15 * elapsedTime
  torus.rotation.x = 0.15 * elapsedTime

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
