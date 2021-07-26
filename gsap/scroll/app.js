gsap.registerPlugin(ScrollTrigger);

gsap.to(".square", {
  x: 500,
  duration: 3,
  scrollTrigger: {
    trigger: ".square",
    start: "top 60%",
    end: "bottom 40%",
    toggleActions: "restart pause resume complete",
    //              onEnter   onLeave   onEnterBack   onLeaveBack
    markers: {
      startColor: "purple",
      endColor: "fuchsia",
      fontSize: "1rem"
    },
    // toggleClass: "red"
  }
})

