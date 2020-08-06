function getIceServers() {
  const FUNCTIONS_ORIGIN = window.location.origin;
  const FUNCTIONS_PATH = "/api/fetchTwilioIceServers";

  const iceServers = {};

  return fetch(`${FUNCTIONS_ORIGIN}${FUNCTIONS_PATH}`)
    .then(res => res.json())
    .then(data => {
      iceServers.iceServers = data.iceServers;
      return iceServers;
    })
    .catch(err => err);
}

export default getIceServers;
