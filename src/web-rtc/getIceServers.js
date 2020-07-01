function getIceServers() {
  const HOST_NAME = window.location.hostname;
  const FUNCTIONS_PATH = "/.netlify/functions/getIceServers";
  let FUNCTIONS_ORIGIN = "";

  if (HOST_NAME === "127.0.0.1" || HOST_NAME === "localhost") {
    console.log(`Local development on ${HOST_NAME}`);
    FUNCTIONS_ORIGIN = `http://${HOST_NAME}:9000`;
  } else {
    FUNCTIONS_ORIGIN = window.location.origin;
  }

  const iceServers = {};

  fetch(`${FUNCTIONS_ORIGIN}${FUNCTIONS_PATH}`)
    .then(res => res.json())
    .then(data => {
      iceServers.iceServers = data.iceServers;
      return iceServers;
    })
    .catch(err => err);
}

export default getIceServers;
