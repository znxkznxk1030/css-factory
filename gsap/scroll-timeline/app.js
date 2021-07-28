gsap.registerPlugin(ScrollTrigger);
const tl = gsap.timeline({ 
  scrollTrigger: {
    trigger: ".box",
    markers: true,
    start: "top 80%",
    end: "top 30%",
    scrub: 1
  }
 });

tl.to('.box', { x: 500, duration: 2 }, 0)
  .to('.box', { y: 200, duration: 3 , delay: 2}, 0)
  .to('.box', { x: 0, duration: 2, delay: 5}, 0);
 