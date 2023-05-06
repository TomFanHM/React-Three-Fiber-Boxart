import { useControls } from "leva";
import React from "react";
import * as THREE from "three";

const positions = [
  new THREE.Vector3(200, 0, 0),
  new THREE.Vector3(-200, 0, 200),
  new THREE.Vector3(-200, 0, -200),
];

const Lighting: React.FC = () => {
  const { color, intensity } = useControls("Light", {
    color: "#ffe692",
    intensity: { value: 1, min: 0.1, max: 1, step: 0.1 },
  });

  return (
    <>
      {positions.map((pos, i) => (
        <spotLight
          key={i}
          color={color}
          intensity={intensity}
          angle={0.7}
          penumbra={0.5}
          position={pos}
        />
      ))}
    </>
  );
};
export default Lighting;
