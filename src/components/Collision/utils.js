export function distance(x1, y1, x2, y2) {
  const xDist = x2 - x1;
  const yDist = y2 - y1;
  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

export function generateCoordicates(radius, canvas) {
  let yMax = canvas.height - radius;
  let yMin = radius;
  let xMax = canvas.width - radius;
  let xMin = radius;
  let x = randomIntFromRange(xMax, xMin);
  let y = randomIntFromRange(yMax, yMin);
  return [x, y];
}
export function randomIntFromRange(max, min) {
  let variable = Math.random() * (max - min) + min;
  return Math.ceil(variable);
}
