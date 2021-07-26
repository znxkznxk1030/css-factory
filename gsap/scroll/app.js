gsap.registerPlugin(ScrollTrigger);

gsap.to(".square", {
  x: 300,
  duration: 3,
  scrollTrigger: {
    trigger: ".square",
    start: "top center",
    end: () => `+=${document.querySelector(".square").offsetHeight}`,
    markers: {
      startColor: "purple",
      endColor: "fuchsia",
      fontSize: "3rem"
    },
    toggleClass: "red"
  }
})

