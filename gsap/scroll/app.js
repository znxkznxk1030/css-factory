gsap.registerPlugin(ScrollTrigger);

gsap.to(".square", {
  x: 300,
  duration: 3,
  scrollTrigger: {
    trigger: ".square",
    start: "top center",
    end: () => `+=${document.querySelector(".square").offsetHeight}`,
    markers: true,
    toggleClass: "red"
  }
})

