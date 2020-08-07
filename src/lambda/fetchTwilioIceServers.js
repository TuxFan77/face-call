exports.handler = function (event, context, callback) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require("twilio")(accountSid, authToken);

  client.tokens
    .create()
    .then(token =>
      callback(null, {
        headers: {
          "Access-Control-Allow-Origin": "localhost"
        },
        statusCode: 200,
        body: JSON.stringify(token)
      })
    )
    .catch(err => callback(err));
};
