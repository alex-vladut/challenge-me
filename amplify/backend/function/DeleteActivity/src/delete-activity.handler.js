const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient({ region: process.env.REGION });

const ACTIVITIES_TABLE = process.env.ACTIVITIES_TABLE;

exports.deleteActivity = async event => {
  const { identityId, activityId, expectedVersion } = event;
  const result = await dynamoDb.get({
    TableName: ACTIVITIES_TABLE,
    Key: {
      id: activityId
    }
  }).promise();
  const activity = result.Item;
  if (!activity) {
    throw new Error("Not found.");
  }
  if (activity.activityOwnerId !== identityId) {
    throw new Error("Not authorized!");
  }

  await dynamoDb.delete({
    TableName: ACTIVITIES_TABLE,
    Key: {
      id: activityId
    },
    ConditionExpression: 'version = :expectedVersion',
    ExpressionAttributeValues: {
      ':expectedVersion': +expectedVersion
    }
  }).promise();

  return activity;
}