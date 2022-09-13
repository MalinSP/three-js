import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

//GUI
const gui = new GUI()

// Textures

const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()

const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load(
  '/textures/door/ambientOcclusion.jpg'
)
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('/textures/matcaps/1.png')
const gradientTexture = textureLoader.load('/textures/gradients/3.jpg')

const environmentMapTexture = cubeTextureLoader.load([
  '/textures/environmentMaps/0/px.jpg',
  '/textures/environmentMaps/0/nx.jpg',
  '/textures/environmentMaps/0/py.jpg',
  '/textures/environmentMaps/0/ny.jpg',
  '/textures/environmentMaps/0/pz.jpg',
  '/textures/environmentMaps/0/nz.jpg',
])
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object Basic
// const material = new THREE.MeshBasicMaterial({ map: doorColorTexture })
// material.map = matcapTexture // same result
// material.color.set("yellow")
// material.color = new THREE.Color('#f0f')
// material.wireframe = true
// material.opacity = 0.5
// material.transparent = true
// material.alphaMap = doorAlphaTexture //controls the transparency with a texture
// material.side = THREE.DoubleSide // also BackSide, default FrontSide

//===================================
// Normal Normals are information encoded in each vertex that contains the direction of the outside of the face. Lightning, reflection, refraction and etc
// const material = new THREE.MeshNormalMaterial()
// material.flatShading = true

//===================================
// Matcap display a color by using normals as reference to pick the right color on a texture that looks like a sphere. Get illusion that the objects are being illuminated
// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture

//===================================
//will simply color the geometry in white if it's close to the camera's near value and in black if it's close to the far value of the camera
// const material = new THREE.MeshDepthMaterial()

//===================================
// LambertMaterial will react to light
//const material = new THREE.MeshLambertMaterial() // good works with pointlight

//===================================
// The MeshPhongMaterial is very similar to the MeshLambertMaterial, but the strange patterns are less visible, and you can also see the light reflection on the surface of the geometry:
//const material = new THREE.MeshPhongMaterial()
//material.shininess = 100 // control light reflection
//material.specular = new THREE.Color(0x1188ff) // color

//===================================
// similar to Lambert but with cartoonish
// By default, you only get a two parts coloration (one for the shadow and one for the light). To add more steps to the coloration, you can use the gradientMap property and use the gradientTexture we loaded at the start of the lesson:
//If you test this, you'll see that the cartoon effect doesn't work anymore. That is because the gradient texture we used is tiny, and the pixels of that texture are blended. Yes, it's a matter of minFilter, magFilter, and mipmapping like we saw in the Textures lesson.
//To fix this, we can simply change the minFilter and magFilter to THREE.NearestFilter.
// Using THREE.NearestFilter means that we are not using the mip mapping, we can deactivate it with gradientTexture.generateMipmaps = false:
// const material = new THREE.MeshToonMaterial()
// material.gradientMap = gradientTexture
// gradientTexture.minFilter = THREE.NearestFilter
// gradientTexture.magFilter = THREE.NearestFilter
// gradientTexture.generateMipmaps = false

//===================================
//The MeshStandardMaterial uses physically based rendering principles. Yes, we are talking about the PBR we saw in the Textures lesson. Like the MeshLambertMaterial and the MeshPhongMaterial, it supports lights but with a more realistic algorithm and better parameters like roughness and metalness.
// It's called "standard" because the PBR is becoming a standard in many software, engines, and libraries. The idea is to have a realistic result with realistic parameters, and you should have a very similar result regardless of the technology you are using:
// const material = new THREE.MeshStandardMaterial()
// material.metalness = 0 //do not combine with metalnessMap
// material.roughness = 1 // same to roughness
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1
// material.displacementMap = doorHeightTexture // move the vertices to create relief
// material.displacementScale = 0.05
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture // add details on surface
// material.normalScale.set(0.5, 0.5) // change intensity
// material.transparent = true
// material.alphaMap = doorAlphaTexture

//===================================
// EnvMap - image what's surrounding the scene
const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2
material.envMap = environmentMapTexture

//===================================
// MeshPhysicalMaterial - the same as MeshStandart but with support of a clear coat effects

//====================================
//The aoMap property (literally "ambient occlusion map") will add shadows where the texture is dark. For it to work, you must add what we call a second set of UV (the coordinates that help position the textures on the geometries).
//We can simply add new attributes like we did on the Geometries lesson and use the default uv attribute. In more simple terms, we duplicated the uv attribute.
//Call this new attribute uv2:

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), material)
sphere.position.x = -1.5
//console.log(sphere.geometry.attributes)
sphere.geometry.setAttribute(
  'uv2',
  new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
)

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material)
// console.log(plane.geometry.attributes.uv.array)
plane.geometry.setAttribute(
  'uv2',
  new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
)

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 64, 128),
  material
)
torus.position.x = 1.5
torus.geometry.setAttribute(
  'uv2',
  new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2)
)

scene.add(sphere, plane, torus)

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight) //same result to depth material

// Debug
gui.add(material, 'roughness').min(0).max(1).step(0.0001)
gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material, 'aoMapIntensity').min(0).max(10).step(0.0001)
gui.add(material, 'displacementScale').min(0).max(10).step(0.0001)
gui
  .add(material.normalScale, 'x')
  .min(0)
  .max(10)
  .step(0.0001)
  .name('normalScaleX')
gui
  .add(material.normalScale, 'y')
  .min(0)
  .max(10)
  .step(0.0001)
  .name('normalScaleY')
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

  //Update objects
  sphere.rotation.y = 0.1 * elapsedTime
  plane.rotation.y = 0.1 * elapsedTime
  torus.rotation.y = 0.1 * elapsedTime

  sphere.rotation.x = 0.15 * elapsedTime
  plane.rotation.x = 0.15 * elapsedTime
  torus.rotation.x = 0.15 * elapsedTime

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
