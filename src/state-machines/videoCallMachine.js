import { createMachine } from "xstate";

export const createVideoCallMachine = videoCall =>
  createMachine(
    {
      id: "call",
      initial: "active",
      context: {
        videoCall,
      },
      states: {
        active: {
          initial: "waiting",
          states: {
            waiting: {
              on: {
                CONNECT: "connected",
                END: "#call.end",
              },
            },
            connected: {
              type: "parallel",
              on: {
                END: "#call.end",
              },
              states: {
                unmutePrompt: {
                  initial: "visible",
                  states: {
                    visible: {
                      id: "unmutePrompt.visible",
                      on: {
                        UNMUTE: "hidden",
                        TOGGLE_MUTE: "hidden",
                      },
                    },
                    hidden: {
                      type: "final",
                    },
                  },
                },
                speaker: {
                  initial: "muted",
                  states: {
                    muted: {
                      on: {
                        UNMUTE: "unmuted",
                        TOGGLE_MUTE: "unmuted",
                      },
                    },
                    unmuted: {
                      on: {
                        TOGGLE_MUTE: "muted",
                      },
                    },
                  },
                },
                mic: {
                  initial: "enabled",
                  states: {
                    enabled: {
                      on: {
                        TOGGLE_MIC: "disabled",
                      },
                    },
                    disabled: {
                      on: {
                        TOGGLE_MIC: "enabled",
                      },
                    },
                  },
                },
                facingMode: {
                  on: {
                    FLIP: {
                      actions: "switchCameras",
                    },
                  },
                },
              },
            },
            hist: {
              type: "history",
            },
          },
        },
        end: {
          initial: "confirm",
          states: {
            confirm: {
              // TEMP: go to confirmed for now until we implement a confirm modal
              // to show the user
              always: {
                target: "confirmed",
              },
              on: {
                CONFIRM: "confirmed",
                CANCEL: "#call.active.hist",
              },
            },
            confirmed: {
              type: "final",
            },
          },
        },
      },
    },
    {
      actions: {
        switchCameras: (c, e) => c.videoCall.switchCameras(),
      },
    }
  );
