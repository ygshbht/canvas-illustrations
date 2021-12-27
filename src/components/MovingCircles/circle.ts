export default function foo(c: any, canvas: any) {
  return class Circle {
    radius: number = 50;
    x: number = 0;
    y: number = 0;
    dx: number = 0;
    dy: number = 0;
    constructor(x: number, y: number, dx: number, dy: number) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
    }
    draw = () => {
      c.beginPath();
      this.radius = window.innerWidth / 20;
      c.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
      c.lineWidth = 3;
      c.strokeStyle = "pink";
      c.stroke();
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
    };
  };
}
