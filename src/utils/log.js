// Logs debug messages to the console
export default function log(message) {
  if (!logging) return;
  const timestamp = Date.now();
  console.log(`${timestamp}: ${message}`);
}
