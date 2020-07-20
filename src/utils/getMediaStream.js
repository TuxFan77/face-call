async function getMediaStream() {
  const portraitOrientation = window.screen.width / window.screen.height < 1;
  console.log(`portraitOrientation = ${portraitOrientation}`);

  const portraitVideoConstraints = {
    width: 2320,
    height: 3088
  };

  const landscapeVideoConstraints = {
    width: 3088,
    height: 2320
  };

  const mediaStream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: portraitOrientation
      ? portraitVideoConstraints
      : landscapeVideoConstraints
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
