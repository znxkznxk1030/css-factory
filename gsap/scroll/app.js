gsap.registerPlugin(ScrollTrigger);

gsap.to(".square", {
  // x: 600,
  duration: 3,
  scrollTrigger: {
    trigger: ".square",
    start: "top 80%",
    end: "top 30%",
    scrub: 8,
    pin: ".square2",
    toggleActions: "restart none none none",
    //              onEnter   onLeave   onEnterBack   onLeaveBack
    markers: {
      startColor: "purple",
      endColor: "fuchsia",
      fontSize: "1rem"
    },
    // toggleClass: "red"
  }
})

