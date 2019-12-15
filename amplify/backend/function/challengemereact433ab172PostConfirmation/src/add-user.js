const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient({ region: process.env.REGION });
const { DateTime } = require('luxon');
const { createHash } = require('crypto');

const USERS_TABLE = `${process.env.USERS_TABLE}-${process.env.ENV}`;

const getGravatarUrl = email => {
  const hash = createHash('md5').update(email).digest("hex");
  return `https://www.gravatar.com/avatar/${hash}?size=200&default=monsterid`;
}

exports.handler = async event => {
  const identityId = event.userName;
  const { name, email } = event.request.userAttributes;
  const result = await dynamoDb.get({
    TableName: USERS_TABLE,
    Key: { id: identityId }
  }).promise();
  if (!result || !result.Item) {
    const user = {
      __typename: 'User',
      id: identityId,
      name,
      pictureUrl: getGravatarUrl(email),
      email,
      createdAt: DateTime.utc().toISO(),
      updatedAt: DateTime.utc().toISO(),
      version: 1,
    };
    await dynamoDb.put({
      TableName: USERS_TABLE,
      Item: user,
      ConditionExpression: 'attribute_not_exists(id)'
    }).promise();
  }

  return event;
}