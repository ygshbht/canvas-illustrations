const mouse = {
  x: 0,
  y: 0,
};

export default function foo(
  c: CanvasRenderingContext2D | null,
  canvas: HTMLCanvasElement
) {
  return class Circle {
    x: number = 0;
    y: number = 0;
    dx: number = 0;
    dy: number = 0;
    radius = 0;
    radians: number = Math.random() * Math.PI * 2;
    velocity = 0.05;
    orbitRadius = Math.random() * (window.innerWidth / 20) + 40;
    color: string = "";
    lastPos = {
      x: 0,
      y: 0,
    };
    lastMouse = {
      y: 0,
      x: 0,
    };
    constructor(x: number, y: number, radius: number, color: string) {
      [this.x, this.lastPos.x, this.lastMouse.x] = [x, x, x];
      [this.y, this.lastPos.y, this.lastMouse.y] = [y, y, y];

      this.radius = radius;
      this.color = color;
    }
    draw = () => {
      this.update();
      if (c) {
        c.beginPath();
        c.strokeStyle = this.color;
        c.lineWidth = this.radius;

        c.moveTo(this.lastPos.x, this.lastPos.y);
        c.lineTo(this.x, this.y);
        c.stroke();
        c.closePath();
      }
    };
    update = () => {
      this.lastPos = { x: this.x, y: this.y };
      this.radians += this.velocity;
      this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
      this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;
      this.x = this.lastMouse.x + Math.cos(this.radians) * this.orbitRadius;
      this.y = this.lastMouse.y + Math.sin(this.radians) * this.orbitRadius;
    };
  };
}

window.addEventListener("mousemove", handleMouseMove);

export function handleMouseMove(e: any) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
}
