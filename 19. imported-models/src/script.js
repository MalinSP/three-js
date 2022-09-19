import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
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

// Models
const dracoLoader = new DRACOLoader()
//Workers
dracoLoader.setDecoderPath('/draco/')

const gltfLoader = new GLTFLoader()
//add to gltfLoader
gltfLoader.setDRACOLoader(dracoLoader)
// gltfLoader.load(
//   '/models/Duck/glTF/Duck.gltf',
//   (gltf) => {
//     //console.log(gltf)
//     //All we want is to get our duck in the scene. We have multiples ways of doing it:
//     //Add the whole scene in our scene. We can do that because even if its name is scene, it's in fact a Group.
//     //Add the children of the scene to our scene and ignore the unused PerspectiveCamera.
//     //Filter the children before adding to the scene to remove the unwanted objects like the PerspectiveCamera.
//     //Add only the Mesh but end up with a duck that could be wrongly scaled, positioned or rotated.
//     //Open the file in a 3D software and remove the PerspectiveCamera then export it again.
//     scene.add(gltf.scene.children[0])
//   }
//   //   () => {
//   //     console.log('progress')
//   //   },
//   //   () => {
//   //     console.log('error')
//   //   }
// )
//==============================
// Another model
// gltfLoader.load('/models/FlightHelmet/glTF/FlightHelmet.gltf', (gltf) => {
//   //console.log(gltf.scene)
//   // we have multiple children
//   //   while (gltf.scene.children.length) {
//   //     scene.add(gltf.scene.children[0])
//   //   }
//   //   const children = [...gltf.scene.children]
//   //   children.forEach((child) => {
//   //     scene.add(child)
//   //   })
//   scene.add(gltf.scene)
// })
//==============================
// Draco compressed version
// gltfLoader.load('/models/Duck/gltf-Draco/Duck.gltf', (gltf) => {
//   scene.add(gltf.scene)
// })
//========================
// Animated model
let mixer = null
gltfLoader.load('/models/Fox/glTF/Fox.gltf', (gltf) => {
  mixer = new THREE.AnimationMixer(gltf.scene)
  const action = mixer.clipAction(gltf.animations[2])
  //   console.log(action)
  action.play()
  gltf.scene.scale.set(0.025, 0.025, 0.025)
  scene.add(gltf.scene)
})
/**
 * Floor
 */
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshStandardMaterial({
    color: '#444444',
    metalness: 0,
    roughness: 0.5,
  })
)
floor.receiveShadow = true
floor.rotation.x = -Math.PI * 0.5
scene.add(floor)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = -7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = -7
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)

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
camera.position.set(2, 2, 2)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 0.75, 0)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () => {
  const elapsedTime = clock.getElapsedTime()
  const deltaTime = elapsedTime - previousTime
  previousTime = elapsedTime

  // Update mixer
  if (mixer !== null) {
    mixer.update(deltaTime)
  }

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
