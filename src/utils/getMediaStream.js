async function getMediaStream() {
  console.log("getMediaStream");

  const { platform } = navigator;
  console.log(`platform: ${platform}`);

  const constraints = { audio: true };

  if (platform && ["iPhone", "iPad", "iPod"].includes(platform)) {
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
