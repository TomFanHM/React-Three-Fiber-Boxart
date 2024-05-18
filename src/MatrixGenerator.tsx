import { forwardRef, useLayoutEffect, useMemo, useRef } from "react";
import niceColors from "nice-color-palettes";
import * as THREE from "three";

const tempColor = new THREE.Color();
const dummy = new THREE.Object3D();

type MatrixGeneratorProps = {
  size: number;
  side: number;
  gap: number;
  pattern: number;
  opacity: number;
};

const MatrixGenerator = forwardRef<THREE.Group, MatrixGeneratorProps>(
  ({ size = 3, side = 1, gap = 0.1, pattern = 0, opacity = 1 }, ref) => {
    const instance = useRef<THREE.InstancedMesh>(null);
    const count = Math.pow(size, 3);

    const nodes = useMemo<THREE.Vector3[]>(() => {
      return createNodes(size, side, gap);
    }, [size, side, gap]);

    const colorArray = useMemo<Float32Array>(() => {
      // If 4x4x4 cube, we need 64 nos. colors
      // Generate an array with random colors, array length equal to count
      const data: {
        color: string;
      }[] = Array.from({ length: count }, () => ({
        color: niceColors[pattern][Math.floor(Math.random() * 5)],
      }));
      //generate rgb in an array
      return Float32Array.from(
        new Array(count)
          .fill(null)
          .flatMap((_, i) => tempColor.set(data[i].color).toArray())
      );
    }, [count, pattern]);

    useLayoutEffect(() => {
      nodes.forEach((position, i) => {
        const { x, y, z } = position;
        dummy.position.set(x, y, z);
        dummy.updateMatrix();
        if (instance && instance.current) {
          instance.current.setMatrixAt(i, dummy.matrix);
          instance.current.instanceMatrix.needsUpdate = true;
        }
      });
    }, [nodes]);

    return (
      <group ref={ref}>
        <instancedMesh ref={instance} args={[undefined, undefined, count]}>
          <boxGeometry args={[side, side, side]}>
            <instancedBufferAttribute
              attach="attributes-color"
              args={[colorArray, 3]}
            />
          </boxGeometry>
          <meshPhongMaterial
            attach="material"
            vertexColors
            transparent
            opacity={opacity}
          />
        </instancedMesh>
      </group>
    );
  }
);

export default MatrixGenerator;

function createNodes(size: number, side: number, gap: number): THREE.Vector3[] {
  const temp: THREE.Vector3[] = [];
  const offset = (side * size + gap * (size - 1)) / 2;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      for (let k = 0; k < size; k++) {
        temp.push(
          new THREE.Vector3(
            i * (side + gap) + side / 2 - offset,
            j * (side + gap) + side / 2 - offset,
            k * (side + gap) + side / 2 - offset
          )
        );
      }
    }
  }
  return temp;
}
