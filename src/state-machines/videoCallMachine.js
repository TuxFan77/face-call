import { Machine } from "xstate";

export const videoCallMachine = Machine({
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
                TOGGLE_MUTE: "unmuted",
                PAUSE: "#videocall.active.paused",
                END: "#videocall.confirmEnd",
              },
            },
            muted: {
              on: {
                TOGGLE_MUTE: "unmuted",
                PAUSE: "#videocall.active.paused",
                END: "#videocall.confirmEnd",
              },
            },
            unmuted: {
              on: {
                TOGGLE_MUTE: "muted",
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
