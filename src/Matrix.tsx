import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";

import MatrixGenerator from "./MatrixGenerator";

const Matrix: React.FC = () => {
  const { color, size, gap, side_length, opacity, rotate } = useControls(
    "Setting",
    {
      color: { value: 0, min: 0, max: 99, step: 1 },
      size: { value: 5, min: 1, max: 25, step: 1 },
      gap: { value: 0.25, min: 0, max: 10, step: 0.05 },
      side_length: { value: 1, min: 0.1, max: 5, step: 0.1 },
      opacity: { value: 1, min: 0.1, max: 1, step: 0.1 },
      rotate: true,
    }
  );

  const ref = useRef<THREE.Group>(null);

  useFrame(() => {
    if (ref && ref.current && rotate) {
      ref.current.rotation.x += 0.01;
    }
  });

  return (
    <MatrixGenerator
      ref={ref}
      size={size}
      side={side_length}
      gap={gap}
      pattern={color}
      opacity={opacity}
    />
  );
};
export default Matrix;
