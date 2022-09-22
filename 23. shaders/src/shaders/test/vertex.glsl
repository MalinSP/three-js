uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform vec2 uFrequency;
uniform float uTime;

attribute vec3 position;
//attribute float aRandom;
attribute vec2 uv;

varying vec2 vUv;
varying float vElevation;

//varying float vRandom;

void main()
{
   vec4 modelPosition = modelMatrix * vec4(position, 1.0);

   float elevation = sin(modelPosition.x * uFrequency.x - uTime) * 0.1;
   elevation += sin(modelPosition.y * uFrequency.y - uTime) * 0.1;
    modelPosition.z += elevation;
   
//    modelPosition.z += sin(modelPosition.x * uFrequency.x - uTime) * 0.1;
//    modelPosition.z += sin(modelPosition.y * uFrequency.y - uTime) * 0.1;

//    modelPosition.y += uTime;
   //modelPosition.y += 1.0;
   //modelPosition.z += sin(modelPosition.x * 10.0) * 0.1;
//    modelPosition.z += aRandom * 0.1;

   vec4 viewPosition = viewMatrix * modelPosition;
   vec4 projectedPosition = projectionMatrix * viewPosition;
   gl_Position = projectedPosition;

   vUv = uv;
   vElevation = elevation;
    //gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
  
  //vRandom = aRandom;
}

    // float a = 1.0;
    // float b = 2.0;
    // float c = a / b;

    // int foo = 123;
    // int bar = -1;
    // int c = a * b;

    // float a = -1.0;
    // int b = 2;
    // float c = a * float(b);

    // bool foo = true;
    // bool bar = false;

    //vec2 foo = vec2(-1.0,2.0);
    // vec2 foo = vec2(0.0);
    // foo.x = 1.0;
    // foo.y = 2.0;

    // vec2 foo = vec2(1.0,2.0); //2.0 and 4.0
    // foo *= 2.0;

    // vec3 foo = vec3(0.0);
    // vec3 bar = vec3(1.0,2.0,3.0);
    // bar.z = 4.0;

    // vec3 purpleColor = vec3(0.0);
    // purpleColor.r = 0.5;
    // purpleColor.b = 1.0;

    //vec2 foo = vec2(1.0,2.0);
    // vec3 bar = vec3(foo, 3.0);

    // vec3 foo = vec3(1.0,2.0,3.0);
    // vec2 bar = foo.xy;

    // vec4 foo = vec4(1.0,2.0,3.0,4.0);
    // float bar = foo.w; // 4 value
//==================================
//     float loremIpsum() {
//     float a = 1.0;
//     float b = 2.0;
//     return a + b;
// }
//==================================
//  float result = loremIpsum();
//==================================
// if function isn't supposed to return anything, we can use void
// void justDoingStuff() {
//     float a = 1.0;
//     float b = 2.0;
// }
