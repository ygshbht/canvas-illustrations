import resolveCollision from "./resolveCollision.js";
import { distance } from "./utils.js";

export default function foo(c: any, canvas: any) {
  return class Circle {
    mass = 1;
    x: number = 0;
    y: number = 0;
    radius: number = 0;
    velocity = {
      x: 0,
      y: 0,
    };
    constructor(x: number, y: number, dx: number, dy: number, radius: number) {
      this.radius = radius;
      this.x = x;
      this.y = y;
      this.velocity.x = dx;
      this.velocity.y = dy;
    }
    draw = (circles: any[]) => {
      this.update(circles);
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
      c.lineWidth = 3;
      c.strokeStyle = "blue";
      c.stroke();
    };
    update = (circles: any[]) => {
      if (this.x >= canvas.width - this.radius && this.velocity.x > 0) {
        this.velocity.x = -Math.abs(this.velocity.x);
      }
      if (this.x <= this.radius && this.velocity.x < 0)
        this.velocity.x = Math.abs(this.velocity.x);

      if (this.y >= canvas.height - this.radius && this.velocity.y > 0) {
        this.velocity.y = -Math.abs(this.velocity.x);
      }
      if (this.y <= this.radius && this.velocity.y < 0)
        this.velocity.y = Math.abs(this.velocity.y);

      this.x += this.velocity.x;
      this.y += this.velocity.y;

      for (let i = 0; i < circles.length; i++) {
        const [x1, x2, y1, y2] = [this.x, this.y, circles[i].x, circles[i].y];
        let dist = distance(x1, x2, y1, y2);
        if (dist - this.radius * 2 < 0) {
          resolveCollision(this, circles[i]);
        }
      }
    };
  };
}
