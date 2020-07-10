// Checks if the browser supports the mediaDevices API
// If so, returns a promise that resolves to an array of media device kinds

function hasMediaCapabilities() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices)
    return Promise.reject(
      new Error("Browser doesn't support mediaDevices API")
    );

  const capabilities = new Set();

  return navigator.mediaDevices.enumerateDevices().then(devices => {
    devices.forEach(device => capabilities.add(device.kind));
    return Array.from(capabilities);
  });
}

export default hasMediaCapabilities;
