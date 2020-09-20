import { createMachine, assign } from "xstate";

export const createVideoCallMachine = (videoCall, remoteVideo) =>
  createMachine(
    {
      id: "call",
      initial: "inactive",
      context: {
        videoCall,
        remoteVideo,
        currentFacingMode: "",
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
                playing: {
                  target: "connected",
                  cond: "isRemoteVideo",
                },
                END: "#call.end",
              },
            },
            connected: {
              type: "parallel",
              entry: "muteSpeaker",
              on: {
                END: "#call.end",
              },
              states: {
                controlBar: {
                  initial: "momentary",
                  states: {
                    hidden: {
                      on: {
                        mousemove: "momentary",
                      },
                    },
                    momentary: {
                      on: {
                        mouseenter: "visible",
                      },
                      after: {
                        2500: "hidden",
                      },
                    },
                    visible: {
                      on: {
                        mouseleave: "momentary",
                      },
                    },
                  },
                },
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
                    SET_FACING_MODE: {
                      actions: "setFacingMode",
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
        switchCameras: (c, _) => c.videoCall.switchCameras(),
        setFacingMode: assign({
          currentFacingMode: (_, e) => e.facingMode,
        }),
        muteSpeaker: (c, _) => (c.remoteVideo.current.muted = true),
        unmuteSpeaker: (c, _) => (c.remoteVideo.current.muted = false),
        enableMic: (c, _) => c.videoCall.muteMic(false),
        disableMic: (c, _) => c.videoCall.muteMic(true),
        endCall: (c, _) => c.videoCall.endCall(),
      },
      guards: {
        isLocalVideo: (_, e) => e.target.id === "localVideo",
        isRemoteVideo: (_, e) => e.target.id === "remoteVideo",
      },
    }
  );
