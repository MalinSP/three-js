# Three.js Journey

## Setup

Download [Node.js](https://nodejs.org/en/download/).
Run this followed commands:

```bash
# Install dependencies (only the first time)
npm install

# Run the local server at localhost:8080
npm run dev

# Build for production in the dist/ directory
npm run build
```

Shadow map algorithm
Different types of algorithms can be applied to shadow maps:

- THREE.BasicShadowMap: Very performant but lousy quality

- THREE.PCFShadowMap: Less performant but smoother edges
  THREE.PCFSoftShadowMap: Less performant but even softer edges (usually)

- THREE.VSMShadowMap: Less performant, more constraints, can have unexpected results

---

To change it, update the renderer.shadowMap.type property. The default is THREE.\* PCFShadowMap but you can use THREE.PCFSoftShadowMap for better quality.
