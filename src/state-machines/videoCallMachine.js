import { createMachine } from "xstate";

export const videoCallMachine = createMachine({
  id: "call",
  initial: "active",
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
                  on: {
                    UNMUTE: "hidden",
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
                  },
                },
                unmuted: {
                  on: {
                    MUTE: "muted",
                  },
                },
              },
            },
            mic: {
              initial: "disabled",
              states: {
                disabled: {
                  on: {
                    ENABLE_MIC: "enabled",
                  },
                },
                enabled: {
                  on: {
                    DISABLE_MIC: "disabled",
                  },
                },
              },
            },
            facingMode: {
              initial: "user",
              states: {
                user: {},
                environment: {},
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
});
