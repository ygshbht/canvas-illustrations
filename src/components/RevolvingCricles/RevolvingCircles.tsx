import React, { useEffect, useRef } from "react";
import particle from "./particle";

let particles: any[] = [];

interface props {
  containerRef: React.RefObject<HTMLDivElement>;
}

const colors = ["#00bdff", "#4d39ce", "#088eff"];

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}
let isActive = false;
export default function RevolvingCircles({ containerRef }: props) {
  isActive = true;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const container = containerRef.current as HTMLDivElement;
    const canvas = canvasRef.current as HTMLCanvasElement;
    canvas.height = container.offsetHeight;
    canvas.width = container.offsetWidth;
    canvas.style.background = "white";
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
    const Particle = particle(c, canvas);
    particles = [];
    for (let i = 0; i < 100; i++) {
      const x = canvas.width / 2;
      const y = canvas.height / 2;
      const radius = Math.random() * 2 + window.innerWidth / 600;
      particles.push(new Particle(x, y, radius, getRandomColor()));
    }
    animate(c);
    return () => {
      isActive = false;
    };
  }, []);
  return <canvas ref={canvasRef}></canvas>;
}

function animate(c: CanvasRenderingContext2D | null) {
  if (c) {
    c.fillStyle = "rgba(255,255,255,0.1)";
    c.fillRect(0, 0, window.innerWidth, window.innerHeight);
  }
  if (!isActive) return;
  requestAnimationFrame(() => animate(c));
  particles.forEach((particle) => {
    particle.draw(particles);
  });
}
