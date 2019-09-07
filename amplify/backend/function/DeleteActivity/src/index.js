const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient({ region: process.env.REGION });

const deleteActivity = async event => {
  const identityId = event.identity.cognitoIdentityId;
  const activitiesTableName = `${process.env.ACTIVITIES_TABLE}-${process.env.ENV}`;
  const activityId = event.arguments.input.id;
  const expectedVersion = event.arguments.input.expectedVersion;
  const result = await dynamoDb.get({
    TableName: activitiesTableName,
    Key: {
      id: activityId
    }
  }).promise();
  const activity = result.Item || undefined;
  if (!activity) {
    throw new Error("Not found.");
  }
  if (activity.activityOwnerId !== identityId) {
    throw new Error("Not authorized!");
  }

  await dynamoDb.delete({
    TableName: activitiesTableName,
    Key: {
      id: activityId
    },
    ConditionExpression: 'version = :expectedVersion',
    ExpressionAttributeValues: {
      ':expectedVersion': expectedVersion
    }
  }).promise();

  return activity;
}

const resolvers = {
  Mutation: {
    deleteActivity,
  }
}

exports.handler = async event => {
  const typeHandler = resolvers[event.typeName];
  if (typeHandler) {
    const resolver = typeHandler[event.fieldName];
    if (resolver) {
      return await resolver(event);
    }
  }
  throw new Error("Resolver not found.");
};
