/*!
 * Created by Canvas Dojo <https://github.com/znxkznxk1030/canvas-dojo>
 *
 * canvas-boilerplate by <https://github.com/christopher4lis/canvas-boilerplate>
 * Learn more https://chriscourses.com/
 */

const unsplasImg =
  'https://images.unsplash.com/photo-1623435243235-ec41e6c986ab?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYyODk1NzAyMw&ixlib=rb-1.2.1&q=85';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 300;

let imgObj = new Image();

imgObj.onload = function () {
  let w = canvas.width;
  let nw = imgObj.naturalWidth;
  let nh = imgObj.naturalHeight;

  let aspect = nw / nh;
  let h = w / aspect;
  console.log(h);
  canvas.height = h;

  ctx.drawImage(imgObj, 0, 0, w, h);

  canvas.addEventListener('click', colorChannel);

  // ctx.drawImage(imgObj, 500, 1000, 200, 200 / aspect, 0, 0, 300, h);
};
imgObj.crossOrigin = 'Anonymous';
imgObj.src = unsplasImg;

let origin = null;

const greyscale = function (ev) {
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  if (origin != null) {
    console.log('origin: ', origin);
    imgData.data.set(origin);
    origin = null;

    ctx.putImageData(imgData, 0, 0);
    return;
  }

  origin = imgData.data.slice();
  let arr = imgData.data.slice();

  console.log(imgData.data);
  console.log(Array.isArray(imgData.data));
  console.log(typeof imgData.data);
  for (let i = 0; i < arr.length; i += 4) {
    const ttl = arr[i] + arr[i + 1] + arr[i + 2];
    const avg = ttl / 3;

    arr[i] = avg; //  red
    arr[i + 1] = avg; //  green
    arr[i + 2] = avg; //  blue
  }
  imgData.data.set(arr);
  // imgData.data = arr;
  // imgData.data
  ctx.putImageData(imgData, 0, 0);
};

const colorChannel = function (ev) {
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  if (origin != null) {
    console.log('origin: ', origin);
    imgData.data.set(origin);
    origin = null;

    ctx.putImageData(imgData, 0, 0);
    return;
  }

  origin = imgData.data.slice();
  let arr = imgData.data.slice();

  for (let i = 0; i < arr.length; i += 4) {
    const ttl = arr[i] + arr[i + 1] + arr[i + 2];
    const avg = ttl / 3;

    arr[i] = 0; //  red
    arr[i + 1] = avg; //  green
    arr[i + 2] = avg; //  blue
  }
  imgData.data.set(arr);
  // imgData.data = arr;
  // imgData.data
  ctx.putImageData(imgData, 0, 0);
};

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
