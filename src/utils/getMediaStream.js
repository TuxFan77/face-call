async function getMediaStream() {
  const mediaStream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true
  });

  const videoTrack = mediaStream.getVideoTracks()[0];

  // Firefox doesn't support MediaStreamTrack.getCapabilities()
  // https://bugzilla.mozilla.org/show_bug.cgi?id=1179084
  // if (videoTrack.getCapabilities) {
  //   const { width, height } = videoTrack.getCapabilities();

  //   videoTrack.applyConstraints({
  //     width: width.max,
  //     height: height.max
  //   });
  // }

  return mediaStream;
}

export default getMediaStream;
