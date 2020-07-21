async function getMediaStream() {
  console.log(navigator.platform);

  const constraints = { audio: true };

  if (["iPhone", "iPad", "iPod"].includes(navigator.platform)) {
    constraints.video = true;
  } else {
    constraints.video = {
      width: { min: 640, ideal: 1280, max: 1920 },
      height: { min: 480, ideal: 720, max: 1080 }
    };
  }

  return await navigator.mediaDevices.getUserMedia(constraints);
}

export default getMediaStream;
