exports.handler = function (event, context, callback) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require("twilio")(accountSid, authToken);

  client.messages
    .create({
      body: "A test message",
      from: "+14244445805",
      to: "+17802352335"
    })
    .then(message =>
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(message)
      })
    )
    .catch(err => callback(err));
};
