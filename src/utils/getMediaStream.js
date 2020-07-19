async function getMediaStream() {
  let portraitOrientation = window.innerWidth / window.innerHeight < 1;
  console.log(`portraitOrientation = ${portraitOrientation}`);

  const portraitVideoConstraints = {
    width: { min: 480, ideal: 1080 },
    height: { min: 640, ideal: 1920 }
  };

  const landscapeVideoConstraints = {
    width: { min: 640, ideal: 1920 },
    height: { min: 480, ideal: 1080 }
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
    console.log(`Actual width: ${width.max}\nActual height: ${height.max}`);
  }

  return mediaStream;
}

export default getMediaStream;
