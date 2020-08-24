import React from "react";
import { motion } from "framer-motion";

import LinkButton from "./LinkButton";

// Use the styles from Button and turn it into a motion component
const AnimatedButton = motion.custom(LinkButton);

const SubmitButton = props => {
  const variants = {
    active: { opacity: 1 },
    disabled: { opacity: 0.4 },
  };

  return (
    <AnimatedButton
      as="input" // Renders as an input element to the DOM
      type="submit"
      variants={variants}
      animate={props.disabled ? "disabled" : "active"}
      {...props}
    />
  );
};

export default SubmitButton;
