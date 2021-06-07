window.onload = () => {
  new App();
};

class App {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    document.body.appendChild(this.canvas);

    this.wave = new Wave();

    window.addEventListener('resize', this.resize.bind(this), false);
    this.resize();

    requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * 2;
    this.canvas.height = this.stageHeight * 2;

    this.ctx.scale(2, 2);
    this.wave.resize(this.stageWidth, this.stageHeight);
  }

  animate() {
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.wave.draw(this.ctx);
    requestAnimationFrame(this.animate.bind(this));
  }
}

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.originY = y;

    this.speed = 0.05;
    this.weight = 0;
    this.max = Math.random() * 100 + 150;
  }

  update() {
    this.weight += this.speed;
    this.y = this.originY + Math.sin(this.weight) * this.max;
  }
}

class Wave {
  constructor() {}

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.centerX = stageWidth / 2;
    this.centerY = stageHeight / 2;

    this.init();
  }

  init() {
    this.point = new Point(this.centerX, this.centerY);
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = 'red';

    console.log(this.point);

    ctx.arc(this.point.x, this.point.y, 20, 0, 2 * Math.PI);
    ctx.fill();
    this.point.update();
  }
}
