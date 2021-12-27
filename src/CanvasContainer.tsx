import { useRef } from "react";
import CollidingCircles from "./components/Collision/CollidingCircles";
import Gravity from "./components/Gravity/Gravity";
import MouseRepel from "./components/ImageManipulation/MouseRepel";
import PixelRain from "./components/ImageManipulation/PixelRain";
import MovingCircles from "./components/MovingCircles/MovingCircles";
import ResponsiveCircles from "./components/ResponsiveCircles/ResponsiveCircles";
import RevolvingCircles from "./components/RevolvingCricles/RevolvingCircles";

interface props {
  activeArt: number;
}

export default function CanvasContainer({ activeArt }: props) {
  const containerRef = useRef<HTMLDivElement>(null);
  let arts: any[] = [
    RevolvingCircles,
    MovingCircles,
    Gravity,
    PixelRain,
    ResponsiveCircles,
    CollidingCircles,
    MouseRepel,
  ];
  const ActiveArt = arts[activeArt];
  return (
    <div id="canvas-container" className="bg-slate-200" ref={containerRef}>
      <ActiveArt containerRef={containerRef} />
    </div>
  );
}
