async function getMediaStream() {
  const query = window.matchMedia("(orientation: portrait)");
  console.log(query);

  const portraitVideoConstraints = {
    width: 1080,
    height: 1920
  };

  const landscapeVideoConstraints = {
    width: 1920,
    height: 1080
  };

  const mediaStream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: query.matches ? portraitVideoConstraints : landscapeVideoConstraints
  });

  const videoTrack = mediaStream.getVideoTracks()[0];

  // Firefox doesn't support MediaStreamTrack.getCapabilities()
  // https://bugzilla.mozilla.org/show_bug.cgi?id=1179084
  if (videoTrack.getCapabilities) {
    const { width, height } = videoTrack.getCapabilities();
    console.log(`Actual max camera resolution: ${width.max} x ${height.max}`);
  }

  return mediaStream;
}

export default getMediaStream;
