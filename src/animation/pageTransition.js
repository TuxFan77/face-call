export const pageVariants = {
  in: {
    opacity: 0,
    x: "10vh"
  },

  normal: { opacity: 1, x: 0 },

  out: { opacity: 0, x: "-10vh" }
};

export const pageTransition = {
  type: "tween",
  ease: [0.61, 1, 0.88, 1],
  duration: 0.5
};

export const videoPageVariants = {
  in: {
    opacity: 0,
    x: "0vh"
  },

  normal: { opacity: 1, x: 0 },

  out: { opacity: 0, x: "0vh" }
};
