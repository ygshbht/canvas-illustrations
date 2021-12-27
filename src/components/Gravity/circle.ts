const mouse = {
  x: null,
  y: null,
};

const colors = ["#F0ECE3", "#DFD3C3", "#C7B198", "#A68DAD"];

function getRandomColor() {
  var item = colors[Math.floor(Math.random() * colors.length)];
  return item;
}
export default function foo(
  c: CanvasRenderingContext2D | null,
  canvas: HTMLCanvasElement
) {
  return class Circle {
    x: number = 0;
    y: number = 0;
    dx: number = 0;
    dy: number = 0;
    radius: number = 0;
    color: string = "";
    friction: number = 3;
    gravity: number = 1.5;
    constructor(x: number, y: number, dy: number, radius: number) {
      this.x = x;
      this.y = y;
      this.dy = dy;
      this.radius = radius;
      this.color = getRandomColor();
    }
    draw = () => {
      if (c) {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        c.lineWidth = 3;
        c.fillStyle = this.color;
        c.fill();
      }

      if (this.y >= canvas.height - this.radius) {
        if (Math.abs(this.dy) <= this.friction) {
          this.dy = 0;
          this.friction = 0;
          this.gravity = 0;
        } else {
          this.dy = -(this.dy - this.friction);
          let diff = this.y - (canvas.height - this.radius);
          this.y = canvas.height - this.radius - diff;
        }
      } else {
        if (this.friction === 0) return;
        this.dy += this.gravity;
        this.y += this.dy;
      }
    };
  };
}

window.addEventListener("mousemove", handleMouseMove);

export function handleMouseMove(e: any) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
}
