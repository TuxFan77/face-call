import { createMachine } from "xstate";

export const createVideoCallMachine = (videoCall, remoteVideo) =>
  createMachine(
    {
      id: "call",
      initial: "inactive",
      context: {
        videoCall,
        remoteVideo,
      },
      states: {
        inactive: {
          on: {
            playing: {
              target: "active",
              cond: "isLocalVideo",
            },
          },
        },
        active: {
          initial: "waiting",
          on: {
            ended: "end.callEnded",
            suspend: "end.callEnded",
          },
          states: {
            waiting: {
              on: {
                CONNECT: "connected",
                END: "#call.end",
              },
            },
            connected: {
              entry: "muteSpeaker",
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
                      entry: "muteSpeaker",
                      on: {
                        UNMUTE: "unmuted",
                        TOGGLE_MUTE: "unmuted",
                      },
                    },
                    unmuted: {
                      entry: "unmuteSpeaker",
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
                      entry: "enableMic",
                      on: {
                        TOGGLE_MIC: "disabled",
                      },
                    },
                    disabled: {
                      entry: "disableMic",
                      on: {
                        TOGGLE_MIC: "enabled",
                      },
                    },
                  },
                },
                facingMode: {
                  on: {
                    SWITCH_CAMERAS: {
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
          initial: "confirmEnd",
          states: {
            confirmEnd: {
              // TEMP: go to callEnded for now until we implement a confirm modal
              // to show the user
              always: {
                target: "callEnded",
              },
              on: {
                CONFIRM: "callEnded",
                CANCEL: "#call.active.hist",
              },
            },
            callEnded: {
              entry: "endCall",
              type: "final",
            },
          },
        },
      },
    },
    {
      actions: {
        switchCameras: (c, e) => c.videoCall.switchCameras(),
        muteSpeaker: (c, e) => (c.remoteVideo.current.muted = true),
        unmuteSpeaker: (c, e) => (c.remoteVideo.current.muted = false),
        enableMic: (c, e) => c.videoCall.muteMic(false),
        disableMic: (c, e) => c.videoCall.muteMic(true),
        endCall: (c, e) => c.videoCall.endCall(),
      },
      guards: {
        isLocalVideo: (c, e) => e.id === "localVideo",
        isRemoteVideo: (c, e) => e.id === "remoteVideo",
      },
    }
  );
