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
  constructor(x, y, index) {
    this.x = x;
    this.y = y;
    this.originY = y;

    this.speed = 0.05;
    this.weight = index;
    this.max = Math.random() * 100 + 150;
  }

  update() {
    this.weight += this.speed;
    this.y = this.originY + Math.sin(this.weight) * this.max;
  }
}

class Wave {
  constructor(numPoints) {
    this.numPoints = numPoints ?? 8;
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.centerX = stageWidth / 2;
    this.centerY = stageHeight / 2;

    this.gapX = this.stageWidth / (this.numPoints - 1);

    this.init();
  }

  init() {
    this.points = []

    for (let i = 0; i < this.numPoints; i++) {
      this.points.push(new Point(this.gapX * i, this.centerY, i));
    }
  }

  draw(ctx) {

    for (let i = 0; i < this.numPoints; i++) {
      ctx.beginPath();
      ctx.fillStyle = 'red';
      const point = this.points[i];
      ctx.arc(point.x, point.y, 20, 0, 2 * Math.PI);
      ctx.fill();
      point.update();
    }
  }
}
