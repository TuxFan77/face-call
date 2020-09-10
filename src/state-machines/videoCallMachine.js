import { Machine } from "xstate";

const videoCallMachine = Machine({
  id: "videocall",
  initial: "active",
  states: {
    active: {
      initial: "waiting",
      states: {
        waiting: {
          on: {
            PEER_CONNECTED: "playing",
            END: "#videocall.confirmEnd",
          },
        },
        playing: {
          initial: "unmutePrompt",
          states: {
            unmutePrompt: {
              on: {
                UNMUTE: "unmuted",
                PAUSE: "#videocall.active.paused",
                END: "#videocall.confirmEnd",
              },
            },
            muted: {
              on: {
                UNMUTE: "unmuted",
                PAUSE: "#videocall.active.paused",
                END: "#videocall.confirmEnd",
              },
            },
            unmuted: {
              on: {
                MUTE: "muted",
                PAUSE: "#videocall.active.paused",
                END: "#videocall.confirmEnd",
              },
            },
            back: {
              type: "history",
            },
          },
        },
        paused: {
          on: {
            UNPAUSE: "playing.back",
            END: "#videocall.confirmEnd",
          },
        },
        back: {
          type: "history",
        },
      },
    },
    confirmEnd: {
      on: {
        CANCEL_END: "active.back",
        CONFIRM_END: "ended",
      },
    },
    ended: {
      type: "final",
    },
  },
});
