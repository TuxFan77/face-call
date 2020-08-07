exports.handler = function (event, context, callback) {
  if (event.httpMethod !== "POST") {
    callback(null, { statusCode: 405, body: "Method Not Allowed" });
  }

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const smsNumber = process.env.TWILIO_SMS_NUMBER;
  const client = require("twilio")(accountSid, authToken);

  const body = JSON.parse(event.body);
  const { message, to } = body;

  client.messages
    .create({
      body: message,
      from: smsNumber,
      to
    })
    .then(message =>
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(message)
      })
    )
    .catch(err => callback(err));
};
