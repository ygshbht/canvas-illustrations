import React, { useEffect, useRef } from "react";
import circle from "./circle";
let circles: any[] = [];

interface props {
  containerRef: React.RefObject<HTMLDivElement>;
}
let isActive = false;
export default function Gravity({ containerRef }: props) {
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
    for (let i = 0; i < 445; i++) {
      let x = canvas.width * Math.random();
      let y = canvas.height * Math.random();
      let dy = Math.random() * 8;
      let radius: number = parseInt(
        String((Math.random() * window.innerWidth) / 15)
      );
      circles.push(new Circle(x, y, dy, radius));
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
    circle.draw();
  });
}
