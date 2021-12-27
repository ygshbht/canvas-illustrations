import React, { useEffect, useRef } from "react";
import circle from "./circle";
import { distance, generateCoordicates } from "./utils.js";

let circles: any[] = [];

interface props {
  containerRef: React.RefObject<HTMLDivElement>;
}
let isActive = false;
export default function CollidingCircles({ containerRef }: props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  isActive = true;
  useEffect(() => {
    const container = containerRef.current as HTMLDivElement;
    const canvas = canvasRef.current as HTMLCanvasElement;
    canvas.height = container.offsetHeight;
    canvas.width = container.offsetWidth;
    window.addEventListener("resize", handleResize);
    function handleResize() {
      if (container && canvas) {
        canvas.height = container.offsetHeight;
        canvas.width = container.offsetWidth;
      }
    }
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [containerRef]);

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const c: CanvasRenderingContext2D | null = canvas.getContext("2d");
    const Circle = circle(c, canvas);

    circles = [];
    for (let i = 0; i < 20; i++) {
      let radius = 10;
      let [x, y] = generateCoordicates(radius, canvas);
      let dx = Math.random() * 16;
      let dy = Math.random() * 16;
      dx /= 2;
      dy /= 2;
      if (i !== 0) {
        for (let j = 0; j < circles.length; j++) {
          let dist = distance(x, y, circles[j].x, circles[j].y);
          if (dist - radius * 2 < 0) {
            [x, y] = generateCoordicates(radius, canvas);

            j = -1;
          }
        }
      }
      circles.push(new Circle(x, y, dx, dy, radius));
    }
    animate(c);
    return () => {
      isActive = false;
    };
  }, []);
  return <canvas ref={canvasRef}></canvas>;
}

function animate(c: CanvasRenderingContext2D | null) {
  c?.clearRect(0, 0, window.innerWidth, window.innerHeight);
  if (!isActive) return;
  requestAnimationFrame(() => animate(c));
  circles.forEach((circle) => {
    circle.draw(circles);
  });
}
