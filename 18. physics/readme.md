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

There are many ways to apply forces to a Body:

- applyForce to apply a force to the Body from a specified point in space (not necessarily on the Body's surface) like the wind that pushes everything a little all the time, a small but sudden push on a domino or a greater sudden force to make an angry bird jump toward the enemy castle.
- applyImpulse is like applyForce but instead of adding to the force that will result in velocity changes, it applies directly to the velocity.
- applyLocalForce is the same as applyForce but the coordinates are local to the Body (meaning that 0, 0, 0 would be the center of the Body).
- applyLocalImpulse is the same as applyImpulse but the coordinates are local to the Body.
  Because using "force" methods will result in velocity changes, let's not use "impulse" methods
