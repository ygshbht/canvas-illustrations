import { useEffect, useRef } from "react";

interface props {
  containerRef: React.RefObject<HTMLDivElement>;
}

const image1 = new Image();
image1.src = "/alia.png";

let isActive = false;

export default function PixelRain({ containerRef }: props) {
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
    const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "rgb(0,0,0)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    if (image1.complete) doManipulation();
    else {
      image1.addEventListener("load", () => {
        doManipulation();
      });
    }
    // doManipulation()
    function doManipulation() {
      const [imgWidth, imgHeight] = [640, 640];
      ctx?.drawImage(image1, 0, 0, imgWidth, imgHeight);
      //   greyscaleImage(ctx, imgWidth, imgHeight);
      let particlesArray: any[] = [];
      const numberOfParticles = 5000;
      const pixels = ctx?.getImageData(0, 0, canvas.width, canvas.height);

      const mappedImage: any[] = [];
      if (pixels) {
        for (let y = 0; y < canvas.height; y++) {
          let row: any[] = [];
          for (let x = 0; x < imgWidth; x++) {
            const red = pixels.data[y * 4 * pixels.width + x * 4];
            const green = pixels.data[y * 4 * pixels.width + (x * 4 + 1)];
            const blue = pixels.data[y * 4 * pixels.width + (x * 4 + 2)];
            const brigthness = calculateRelativeBrightness(red, green, blue);
            const cell = [brigthness];
            row.push(cell);
          }
          mappedImage.push(row);
        }
      }

      function calculateRelativeBrightness(r: number, g: number, b: number) {
        let val =
          Math.sqrt(r * r * 0.299 + g * g * 0.587 + b * b * 0.114) / 100;
        return val;
      }

      class Particle {
        x: number = 0;
        y: number = 0;
        speed: number = 0;
        velocity: number = Math.random() * 0.5;
        size: number = Math.random() * 1.5 + 1;
        position1: number = 0;
        position2: number = 0;
        movement: number = 0;
        constructor(y: number) {
          this.x = Math.random() * imgWidth;
          this.y = y;
          this.position1 = Math.floor(this.y);
          this.position2 = Math.floor(this.x);
        }
        update() {
          this.position1 = Math.floor(this.y);
          this.position2 = Math.floor(this.x);
          try {
            this.speed = mappedImage[this.position1][this.position2][0];
          } catch (err) {
            throw err;
          }
          this.movement = 4.55 - this.speed + this.velocity;

          this.y += this.movement;
          if (this.y >= canvas.height) {
            this.y = 0;
            this.x = Math.random() * imgWidth;
          }
        }
        draw() {
          if (!ctx) return;
          ctx?.beginPath();
          ctx.fillStyle = "white";
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      function init() {
        for (let j = 1; j < 5; j++) {
          let quarter = imgHeight / 4;
          for (let i = 0; i < numberOfParticles; i++) {
            let y = imgHeight - parseInt(String(quarter * j));
            particlesArray.push(new Particle(y));
            // if (y >= imgHeight / 2) console.log(y);
          }
        }
      }
      init();
      function animate() {
        if (!ctx) return;
        // ctx?.drawImage(image1, 0, 0, imgWidth, imgWidth);
        ctx.globalAlpha = 0.001;
        ctx.fillStyle = "rgb(0,0,0)";
        ctx.globalAlpha = 0.9;

        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
          particlesArray[i].update();
          ctx.globalAlpha = particlesArray[i].speed * 0.5;
          particlesArray[i].draw();
        }
        if (!isActive) return;
        requestAnimationFrame(animate);
      }
      animate();
    }
    return () => {
      isActive = false;
    };
  }, []);

  return <canvas ref={canvasRef}></canvas>;
}
