let canvas;
let c;

onload = () => {
  canvas = document.querySelector('canvas');
  c = canvas.getContext('2d');
  c.width = window.innerWidth;
  c.height = window.innerHeight;

  init();
  animate();
};

let mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

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

let particles = [];

const init = () => {
  particles = [];
  for (let i = 0; i < 400; i++) {}
};

const animate = () => {
  requestAnimationFrame(animate);
  // console.log(c);
  // c.clearRect(0, 0, c.width, c.height);
  // console.log('animate ... ')
  particles.forEach(particle => {
    particle.update();
  })
};

addEventListener('click', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  console.log(mouse)

    c.beginPath();
    c.arc(200, 200, 10, 0, Math.PI * 2, false);
    c.fillStyle = '#fff';
    c.fill();
    c.closePath();

  for (let i = 0; i < 400; i++) {
    particles.push(new Particle(mouse.x, mouse.y, 5, 'blue'));
  }
});
