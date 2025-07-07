export const dummyBoxes = [];

const bedOrigin = { x: -20.5, y: 2, z: -80 };
const boxSize = { width: 15, height: 11, depth: 33 };
let id = 1;

for (let i = 0; i < 3; i++) { // width (X)
  for (let j = 0; j < 3; j++) { // height (Y)
    for (let k = 0; k < 3; k++) { // depth (Z)
      dummyBoxes.push({
        id: `B${id++}`,
        width: boxSize.width,
        height: boxSize.height,
        depth: boxSize.depth,
        x: bedOrigin.x + i * boxSize.width,
        y: bedOrigin.y + j * boxSize.height,
        z: bedOrigin.z + k * boxSize.depth,
        color: `hsl(${(i*9+j*3+k)*30}, 80%, 60%)`
      });
    }
  }
}
