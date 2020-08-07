function sendSms(smsObject) {
  const FUNCTIONS_ORIGIN = window.location.origin;
  const FUNCTIONS_PATH = "/api/sendTwilioSms";

  return fetch(`${FUNCTIONS_ORIGIN}${FUNCTIONS_PATH}`, {
    method: "POST",
    body: JSON.stringify(smsObject)
  })
    .then(res => res.json())
    .then(data => data)
    .catch(err => err);
}

export default sendSms;
