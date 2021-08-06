const intro = document.querySelector('.intro');
const video = intro.querySelector('video');
const text = intro.querySelector('h1');

gsap.registerPlugin(ScrollTrigger);

let progress = 0;

gsap.to('.container', {
  scrollTrigger: {
    trigger: '.container',
    start: 'top 0%',
    end: 'bottom 100%',
    markers: true,
    pin: intro,
    onUpdate: (self) => {
      console.log(self);
      progress = self.progress;
    },
  },
});

video.currentTime = 0;

setInterval(() => {
  console.log(progress);
  video.currentTime = video.duration * progress;
  console.log(video.currentTime);
}, 100);
