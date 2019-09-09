const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient({ region: process.env.REGION });
const luxon = require('luxon');

exports.handler = async (event, _, callback) => {
  const identityId = event.userName;
  const { name, picture, email } = event.request.userAttributes;
  const usersTableName = `${process.env.USERS_TABLE}-${process.env.ENV}`;
  const result = await dynamoDb.get({
    TableName: usersTableName,
    Key: { id: identityId }
  }).promise();
  if (!result || !result.Item) {
    const user = {
      __typename: 'User',
      id: identityId,
      name,
      pictureUrl: picture,
      email,
      googleIdentityId: identityId,
      activities: [],
      createdAt: luxon.DateTime.utc().toISO(),
      updatedAt: luxon.DateTime.utc().toISO(),
      version: 1,
    };
    await dynamoDb.put({
      TableName: usersTableName,
      Item: user,
      ConditionExpression: 'attribute_not_exists(id)'
    }).promise();
  }

  callback(null, event);
}