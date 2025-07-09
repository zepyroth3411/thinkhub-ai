import { useState, useEffect } from "react";
import Dock from "@/components/Dock";

export default function DockNavbar({
  items,
  panelHeight = 68,
  baseItemSize = 50,
  magnification = 70,
  verticalThresholdRatio = 0.7,
  horizontalMinRatio = 0.3,
  horizontalMaxRatio = 0.7,
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const screenHeight = window.innerHeight;
      const screenWidth = window.innerWidth;

      const verticalThreshold = screenHeight * verticalThresholdRatio;
      const horizontalMin = screenWidth * horizontalMinRatio;
      const horizontalMax = screenWidth * horizontalMaxRatio;

      if (
        clientY > verticalThreshold &&
        clientX > horizontalMin &&
        clientX < horizontalMax
      ) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [verticalThresholdRatio, horizontalMinRatio, horizontalMaxRatio]);

  return (
    <div
      className={`fixed bottom-0 left-0 w-full z-20 transition-all duration-500 ease-in-out ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-full pointer-events-none"
      }`}
    >
      <Dock
        items={items}
        panelHeight={panelHeight}
        baseItemSize={baseItemSize}
        magnification={magnification}
      />
    </div>
  );
}
