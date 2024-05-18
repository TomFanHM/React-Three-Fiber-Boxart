import React from "react";
import { useThree } from "@react-three/fiber";
import { button, useControls } from "leva";

const Screenshot: React.FC = () => {
  const gl = useThree((state) => state.gl);
  useControls({
    Screenshot: button(() => {
      const link: HTMLAnchorElement = document.createElement("a");
      link.setAttribute("download", "canvas.png");
      link.setAttribute(
        "href",
        gl.domElement
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream")
      );
      link.click();
    }),
  });
  return null;
};
export default Screenshot;
