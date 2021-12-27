import { useEffect, useRef } from "react";

interface props {
  containerRef: React.RefObject<HTMLDivElement>;
}

const mouse = {
  x: 0,
  y: 0,
  radius: 100,
};

let isActive = false;

export default function MouseRepel({ containerRef }: props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  isActive = true;
  useEffect(() => {
    const container = containerRef.current as HTMLDivElement;
    const canvas = canvasRef.current as HTMLCanvasElement;
    canvas.height = container.offsetHeight;
    canvas.width = container.offsetWidth;
    canvas.style.background = "black";

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
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (ctx) {
      ctx.font = "30px Verdana";
      ctx.fillStyle = "white";
      ctx.fillText("A", 0, 30);
    }
    const textCoordinates = ctx?.getImageData(0, 0, 100, 100);
    let particleArray: any[] = [];
    class Particle {
      x: number = 0;
      y: number = 0;
      size: number = 0;
      baseX: number = 0;
      baseY: number = 0;
      density: number = 0;
      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.size = 3;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = Math.random() * 30 + 10;
      }
      draw() {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
      update() {
        if (mouse.x === 0 && mouse.y === 0) return;
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let dist = Math.hypot(dx, dy);
        let forceDirectionX = dx / dist;
        let forceDirectionY = dy / dist;
        let maxDistance = mouse.radius;
        let force = (maxDistance - dist) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;
        if (dist < mouse.radius) {
          this.x -= directionX * 3;
          this.y -= directionY * 3;
        } else {
          if (this.x !== this.baseX) {
            let dx = this.x - this.baseX;
            this.x -= dx / 10;
          }
          if (this.y !== this.baseY) {
            let dy = this.y - this.baseY;
            this.y -= dy / 10;
          }
        }
      }
    }
    function init() {
      particleArray = [];
      for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
        for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
          let index = y * 4 * textCoordinates.height + x * 4 + 3;
          if (textCoordinates.data[index] > 128) {
            let positionX = x * 10 + canvas.width / 2 - 100;
            let positionY = y * 10 + canvas.height / 2 - 200;
            particleArray.push(new Particle(positionX, positionY));
          }
        }
      }
    }
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].draw();
        particleArray[i].update();
      }
      connect();
      if (!isActive) return;
      requestAnimationFrame(animate);
    }
    init();
    animate();
    function connect() {
      let opacityValue = 1;
      for (let a = 0; a < particleArray.length; a++) {
        for (let b = a; b < particleArray.length; b++) {
          let dx = particleArray[a].x - particleArray[b].x;
          let dy = particleArray[a].y - particleArray[b].y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 30) {
            opacityValue = 1 - distance / 50;
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacityValue})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(particleArray[a].x, particleArray[a].y);
            ctx.lineTo(particleArray[b].x, particleArray[b].y);
            ctx.stroke();
          }
        }
      }
    }
    return () => {
      isActive = false;
    };
  }, []);

  return <canvas ref={canvasRef}></canvas>;
}

window.addEventListener("mousemove", (e: MouseEvent) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
