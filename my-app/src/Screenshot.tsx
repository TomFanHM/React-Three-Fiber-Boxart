import { useThree } from "@react-three/fiber";
import { useControls, button } from "leva";
import React from "react";

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
