// Be sure to install the @jscad/* packages as "devDependencies",
// externalize them in `vite.config.ts`, and add them to the
// "peerDependencies" in the `package.json` file.

import { primitives, extrusions, booleans } from "@jscad/modeling";
import { Vec2 } from "@jscad/modeling/src/maths/vec2";

const { polygon } = primitives;

export function honeycomb(options?: {
  rows?: number;
  columns?: number;
  radius?: number;
  gap?: number;
  height?: number;
}) {
  const {
    rows = 3,
    columns = 3,
    radius = 10,
    gap = 5,
    height = 5,
  } = options || {};

  const tiles: Vec2[][] = [];

  const inradius = (Math.sqrt(3) / 2) * radius;

  const gcr = gap / Math.sqrt(3);

  // Create a hexagon tile with radius "radius"
  const hexagonVertices = createHexagonVertices(inradius);
  const innerHexagonVertices = createHexagonVertices(inradius - gap);

  const tileFramePoints: Vec2[] = [];

  for (let row = 1; row <= rows; row++) {
    const isEvenRow = row % 2 === 0;
    const rowOffset = isEvenRow ? inradius - gap / 2 : 0;
    for (let column = 1; column <= columns; column++) {
      const translateToTile = translatePoint([
        (column - 1) * (2 * inradius - gap) + rowOffset,
        ((row - 1) * (Math.sqrt(3) * Math.abs(gap - 2 * inradius))) / 2,
      ]);

      const tileVertices = hexagonVertices.map(translateToTile);
      const innerTileVertices = innerHexagonVertices.map(translateToTile);

      if (column === 1) {
        if (isEvenRow) {
          tileFramePoints.unshift([
            innerTileVertices[3][0] - gap,
            innerTileVertices[3][1],
          ]);
        } else {
          tileFramePoints.unshift([tileVertices[3][0], tileVertices[3][1]]);
        }
        if (isEvenRow && row !== rows) {
          tileFramePoints.unshift([
            innerTileVertices[2][0] - gap,
            innerTileVertices[2][1],
          ]);
        } else {
          tileFramePoints.unshift([tileVertices[2][0], tileVertices[2][1]]);
        }
      }
      if (row === rows) {
        tileFramePoints.unshift([tileVertices[1][0], tileVertices[1][1]]);
        if (column !== columns) {
          tileFramePoints.unshift([
            tileVertices[0][0] - gap / 2,
            tileVertices[0][1] + gcr / 2,
          ]);
        }
      }
      if (row === 1) {
        tileFramePoints.push([tileVertices[4][0], tileVertices[4][1]]);
        if (column !== columns) {
          tileFramePoints.push([
            tileVertices[5][0] - gap / 2,
            tileVertices[5][1] - gcr / 2,
          ]);
        }
      }
      if (column === columns) {
        if (isEvenRow || row === 1) {
          tileFramePoints.push([tileVertices[5][0], tileVertices[5][1]]);
        } else {
          tileFramePoints.push([
            innerTileVertices[5][0] + gap,
            innerTileVertices[5][1],
          ]);
        }
        if (isEvenRow || row === rows) {
          tileFramePoints.push([tileVertices[0][0], tileVertices[0][1]]);
        } else {
          tileFramePoints.push([
            innerTileVertices[0][0] + gap,
            innerTileVertices[0][1],
          ]);
        }
      }

      const tile = innerTileVertices;

      tiles.push(tile);
    }
  }

  // const frame = polygon.();

  return extrusions.extrudeLinear(
    { height },
    booleans.subtract(
      polygon({ points: tileFramePoints }),
      ...tiles.map((tile) => polygon({ points: tile })),
    ),
  );
}

function translatePoint(vector: Vec2): (point: Vec2) => Vec2 {
  return (point: Vec2) => {
    return [point[0] + vector[0], point[1] + vector[1]];
  };
}

function createHexagonVertices(inradius: number): Vec2[] {
  const vertices: Vec2[] = [];
  // Calculate circumradius from inradius
  const circumradius = (2 * inradius) / Math.sqrt(3);
  // Each side of the hexagon forms a 60 degree angle
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i + Math.PI / 6; // Convert angle to radians
    const x = circumradius * Math.cos(angle); // Calculate the x coordinate
    const y = circumradius * Math.sin(angle); // Calculate the y coordinate
    vertices.push([x, y]); // Add the vertex to the array
  }
  return vertices;
}
