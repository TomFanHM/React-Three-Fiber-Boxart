import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import "./App.css";
import { Html, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { PacmanLoader } from "react-spinners";
import Matrix from "./Matrix";
import Background from "./Background";
import Screenshot from "./Screenshot";
import Lighting from "./Lighting";

function App() {
  return (
    <div className="container">
      <Canvas
        shadows
        gl={{
          alpha: true,
          antialias: true,
          preserveDrawingBuffer: true,
        }}
      >
        <PerspectiveCamera position={[0, 0, 10]} fov={75} makeDefault />
        <OrbitControls makeDefault />
        <ambientLight intensity={0.5} />
        <color args={[1, 1, 1]} attach="background" />
        <Suspense
          fallback={
            <Html center>
              <PacmanLoader color="#36d7b7" />
            </Html>
          }
        >
          <Matrix />
        </Suspense>
        <Background />
        <Lighting />
        <Screenshot />
      </Canvas>
    </div>
  );
}

export default App;
