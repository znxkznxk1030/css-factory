let canvas;
let c;

window.onload = () => {
  canvas = document.querySelector('canvas');
  c = canvas.getContext('2d');

  resize();
  init();
  animate();
  listen()

};

let mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

let resize = () => {
  let stageWidth = document.body.clientWidth;
  let stageHeight = document.body.clientHeight;

  canvas.width = stageWidth
  canvas.height = stageHeight
  // c.scale(2, 2)
}

class Particle {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity
    this.alpha = 1
  }

  draw() {
    c.save()
    c.globalAlpha = this.alpha
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }

  update() {
    this.draw();
    this.x += this.velocity.x
    this.y += this.velocity.y

    this.velocity.x *= 0.99
    this.velocity.y *= 0.99
    this.velocity.y += 0.03

    this.alpha -= 0.01
  }
}

let particles = [];

const init = () => {
  c.clearRect(0, 0, canvas.width, canvas.height);
  particles = [];
  // for (let i = 0; i < 400; i++) {}
};

const animate = () => {
  requestAnimationFrame(animate);
  c.fillStyle = 'rgba(0, 0, 0, 0.05)'
  c.fillRect(0, 0, canvas.width, canvas.height);
  particles.forEach((particle, i) => {
    if (particle.alpha > 0) {
      particle.update();
    } else {
      // console.log(particle)
      particles.splice(i, 1);
    }
  })
};

const colorSet = ['#C63347', '#F28E63', '#FAEFC4', '#F75781'];

const listen = () => {
  canvas.addEventListener('click', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    const particleCount = 500
    const angleIncrement = ( Math.PI * 2 ) / particleCount
    for (let i = 0; i < particleCount; i++) {
      particles.push(
        new Particle(mouse.x, mouse.y, 3, colorSet[i %  colorSet.length], {
          x: Math.cos(angleIncrement * i) * Math.random() * 10,
          y: Math.sin(angleIncrement * i) * Math.random() * 10
        })
      );
    }
  });

  window.addEventListener('resize', resize);
}
