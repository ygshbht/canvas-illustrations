const colors = ["#F0ECE3", "#DFD3C3", "#C7B198", "#A68DAD"];

function getRandomColor() {
  var item = colors[Math.floor(Math.random() * colors.length)];
  return item;
}

export default function foo(c: any, canvas: any) {
  return class Circle {
    radius: number = 50;
    x: number = 0;
    y: number = 0;
    dx: number = 0;
    dy: number = 0;
    scaleOnHover: number = 14;
    initialRadius: number = 50;
    maxRadius: number = 100;
    color: string = "";

    constructor(x: number, y: number, dx: number, dy: number, radius: number) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.radius = radius;
      this.initialRadius = radius;
      this.color = getRandomColor();
    }
    draw = () => {
      this.maxRadius = this.initialRadius * 2.3;
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
      c.lineWidth = 3;

      c.fillStyle = this.color;
      c.fill();
      if (this.x >= canvas.width - this.radius && this.dx > 0) {
        this.dx = -Math.abs(this.dx);
      }
      if (this.x <= this.radius && this.dx < 0) this.dx = Math.abs(this.dx);

      if (this.y >= canvas.height - this.radius && this.dy > 0) {
        this.dy = -Math.abs(this.dx);
      }
      if (this.y <= this.radius && this.dy < 0) this.dy = Math.abs(this.dy);

      this.x += this.dx;
      this.y += this.dy;
      const xDist = Math.abs(this.x - (mouse.x || 999999));
      const yDist = Math.abs(this.y - (mouse.y || 999999));
      if (xDist < this.maxRadius && yDist < this.maxRadius)
        this.radius += this.scaleOnHover;
      else {
        if (this.radius > this.initialRadius) this.radius -= this.scaleOnHover;
      }
      this.radius = Math.max(0, this.radius);
      this.radius = Math.min(this.maxRadius, this.radius);
    };
  };
}

const mouse = {
  x: null,
  y: null,
};

window.addEventListener("mousemove", handleMouseMove);

function handleMouseMove(e: any) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
}
