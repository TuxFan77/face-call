import React from "react";
import { motion } from "framer-motion";

import LargeButton from "./LargeButton";

// Use the styles from LargeButton and turn it into a motion component
const Button = motion.custom(LargeButton);

const SubmitButton = props => {
  const variants = {
    active: { opacity: 1 },
    disabled: { opacity: 0.4 }
  };

  return (
    <Button
      as="input" // Renders as an input element to the DOM
      type="submit"
      variants={variants}
      animate={props.disabled ? "disabled" : "active"}
      {...props}
    />
  );
};

export default SubmitButton;
