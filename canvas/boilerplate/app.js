let canvas = document.querySelector('canvas');
let c = canvas.getContext('2d');

c.width = innerWidth;
c.height = innerHeight;

let mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

addEventListener('resize', () => {
  c.width = innerWidth;
  c.height = innerHeight;

  init();
});

class Particle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }

  update() {
    this.draw();
  }
}

const animate = () => {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, c.width, c.height);
};

let object = [];

const init = () => {
  object = [];
  for (let i = 0; i < 400; i++) {}
};

init();
animate();
