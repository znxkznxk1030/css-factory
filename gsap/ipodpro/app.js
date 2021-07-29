const intro = document.querySelector('.intro');
const video = intro.querySelector('video');

video.currentTime = 0;


setInterval(() => {
  video.currentTime += 0.1;
  console.log(video.currentTime);
}, 500);