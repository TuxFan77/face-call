async function getMediaStream() {
  const mediaStream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true
  });
  const videoTrack = mediaStream.getVideoTracks()[0];
  const { width, height } = videoTrack.getCapabilities();

  // console.log(width.max);
  // console.log(height.max);
  // console.log(window.screen.width);
  // console.log(window.screen.height);

  videoTrack.applyConstraints({
    width: width.max,
    height: height.max
  });

  return mediaStream;
}

export default getMediaStream;
