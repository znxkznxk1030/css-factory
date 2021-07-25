gsap.registerPlugin(ScrollTrigger);

gsap.to(".square", {
  x: 300,
  duration: 3,
  scrollTrigger: {
    trigger: ".square",
    start: "top center",
    end: "center 20%",
    markers: true,
    toggleClass: "red"
  }
})

