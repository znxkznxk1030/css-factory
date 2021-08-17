/*!
 * Created by Canvas Dojo <https://github.com/znxkznxk1030/canvas-dojo>
 *
 * canvas-boilerplate by <https://github.com/christopher4lis/canvas-boilerplate>
 * Learn more https://chriscourses.com/
 */

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

const PI2 = Math.PI * 2;

const colors = ["red", "green", "blue", "black", "pink"];

// Event Listeners
addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

// Objects
class Polygon {
  constructor(x, y, radius, sides) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.sides = sides;
    this.color = '#000';
  }

  draw() {
    c.save();
    c.beginPath();

    c.fillStyle = this.color;

    c.translate(this.x, this.y);
    const k = - 0.01;
    // c.rotate(k * mouse.x);
    const angle = PI2 / this.sides;

    for (let index = 0; index < this.sides; index++) {
      const x = this.radius * Math.cos(angle * index);
      const y = this.radius * Math.sin(angle * index);

      // index === 0 ? c.moveTo(x, y) : c.lineTo(x, y);

      // c.beginPath();
      // c.arc(x, y, 20, 0, PI2);
      // c.fill();
      // c.closePath();
      c.save();
      c.translate(x, y);
      c.fillStyle = colors[index];
      // c.rotate()
      c.beginPath();
      const sides2 = 4;
      const angle2 = PI2 / sides2;
      for (let j = 0; j < sides2; j++) {
        const x2 = 80 * Math.cos(angle2 * j);
        const y2 = 80 * Math.sin(angle2 * j);

        j === 0? c.moveTo(x2, y2): c.lineTo(x2, y2);

      }
      c.fill();
      c.closePath()
      c.restore();
    }

    // c.fill();

    // c.closePath();
    c.restore();
  }

  update() {
    this.draw();
  }
}

// Implementation
let polygon;
function init() {
  polygon = new Polygon(
    canvas.width / 2,
    canvas.height / 2,
    canvas.height / 3,
    5
  );
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  polygon.update();

}

init();
animate();