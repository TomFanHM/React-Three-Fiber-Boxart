import React from "react";
import { Environment, Sphere } from "@react-three/drei";
import { Color, Depth, LayerMaterial, Noise } from "lamina";
import * as THREE from "three";

const Background: React.FC = () => {
  return (
    <Environment background resolution={64}>
      <Sphere scale={100}>
        <LayerMaterial side={THREE.BackSide}>
          <Noise mapping="local" type="cell" scale={0.5} mode="softlight" />
          <Color color="#C9FFBF" alpha={1} mode="multiply" />
          <Depth
            colorA="#FFAFBD"
            colorB="#C9FFBF"
            alpha={0.5}
            mode="multiply"
            near={0}
            far={300}
            origin={[100, 100, 100]}
          />
        </LayerMaterial>
      </Sphere>
    </Environment>
  );
};
export default Background;
