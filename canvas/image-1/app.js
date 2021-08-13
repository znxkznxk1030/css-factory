/*!
 * Created by Canvas Dojo <https://github.com/znxkznxk1030/canvas-dojo>
 *
 * canvas-boilerplate by <https://github.com/christopher4lis/canvas-boilerplate>
 * Learn more https://chriscourses.com/
 */

const canvas = document.querySelector("canvas");
const ctx= canvas.getContext("2d");

canvas.width = 300;
canvas.height = 300;

let imgObj = new Image();

imgObj.onload = function () {
  let w = canvas.width;
  let nw = imgObj.naturalWidth;
  let nh = imgObj.naturalHeight;

  let aspect = nw/nh;
  let h = w / aspect;
  canvas.height = h;

  ctx.drawImage(imgObj, 0, 0, 300, h);
};

imgObj.src = "./splash-1.jpeg";

const greyscale = function (ev) {}





/**
 *  utils.js - <https://github.com/christopher4lis/canvas-boilerplate/blob/master/src/js/utils.js>
 *  @function randomIntFromRange Picks a random integer within a range
 *  @function randomColor Picks a random color
 *  @function dispatch Find the distance between two points
 **/ 

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
  const xDist = x2 - x1;
  const yDist = y2 - y1;

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}
