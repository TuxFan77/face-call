import { Machine } from "xstate";

const controlBarMachine = Machine({
  id: "controlBarMachine",
  initial: "hidden",
  states: {
    hidden: {
      on: {
        SHOW: "visible",
      },
    },
    visible: {
      on: {
        HIDE: "hidden",
      },
    },
  },
});

export default controlBarMachine;
