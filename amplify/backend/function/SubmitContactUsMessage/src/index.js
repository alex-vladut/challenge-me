const AWS = require('aws-sdk');
const SNS = new AWS.SNS();

const TOPIC_ARN = process.env.TOPIC_ARN;

exports.handler = async event => {
  const identityId = event.identity.username;
  const message = {
    ...event.arguments.input,
    identityId,
  };
  await SNS.publish({
    Subject: `New message from ${event.arguments.input.name}`,
    Message: JSON.stringify(message, null, 2),
    TopicArn: TOPIC_ARN
  }).promise();
  return "";
};
