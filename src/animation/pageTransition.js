export const pageVariants = {
  in: {
    opacity: 0,
    y: "-10vh"
  },

  normal: { opacity: 1, y: 0 },

  out: { opacity: 0, y: 0, transition: { duration: 0.25 } }
};

export const pageTransition = {
  type: "tween",
  ease: [0.61, 1, 0.88, 1],
  duration: 0.5
};
