function hasMediaCapabilities() {
  if ("mediaDevices" in navigator)
    console.log("Browser has media capabilities");
}

export default hasMediaCapabilities;
