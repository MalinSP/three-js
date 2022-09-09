import './style.css'
import * as THREE from 'three'

// Scene
const scene = new THREE.Scene()

//Object
const group = new THREE.Group()
group.position.y = 1
group.scale.y = 1
group.rotation.y = 1
scene.add(group)

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 'green' })
)
group.add(cube1)

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 'blue' })
)
cube2.position.x = -2
group.add(cube2)

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 'white' })
)
cube3.position.x = 2
group.add(cube3)

// Axes Helper
const axesHelper = new THREE.AxesHelper(1)
scene.add(axesHelper)

// Sizes
const sizes = {
  width: 600,
  height: 450,
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
// camera.position.x = 1
// camera.position.y = 1
//console.log(mesh.position.distanceTo(camera.position)) // distance between the camera and the cube
scene.add(camera)

// camera.lookAt(new THREE.Vector3(1, 2, 3))
// camera.lookAt(mesh.position)

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('canvas.webgl'),
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

// Object
// const geometry = new THREE.BoxGeometry(0.7, 0.7, 0.7)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// const mesh = new THREE.Mesh(geometry, material)
// // mesh.position.x = -0.7
// // mesh.position.y = -0.6
// // mesh.position.z = 1
// mesh.position.set(0.7, -0.6, 1)
// //console.log(mesh.position.length()) // the length of a vector:
// scene.add(mesh)
// //mesh.position.normalize()
// // console.log(mesh.position.length()) // will be 1

// // Scale
// // mesh.scale.x = 2
// // mesh.scale.y = 0.5
// // mesh.scale.z = 0.5
// mesh.scale.set(2, 0.5, 0.5)

//Rotation
// mesh.rotation.reorder('YXZ')
// mesh.rotation.x = Math.PI * 0.25
// mesh.rotation.y = Math.PI * 0.25
