const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient({ region: process.env.REGION });

const PARTICIPATIONS_TABLE = `${process.env.PARTICIPATIONS_TABLE}-${process.env.ENV}`;

exports.handler = async event => {
  const participations = await findActivityParticipations(event.prev.result.id);
  if (participations.length) {
    await dynamoDb
      .batchWrite({ RequestItems: { [PARTICIPATIONS_TABLE]: participations.map(createDeleteRequest) } })
      .promise();
  }
  return event.prev.result;
};

const createDeleteRequest = participation => ({
  DeleteRequest: {
    Key: {
      id: participation.id
    }
  }
})

const findActivityParticipations = async activityId => {
  const participations = [];
  let lastEvaluatedKey = null;
  do {
    const result = await dynamoDb.query({
      TableName: PARTICIPATIONS_TABLE,
      IndexName: 'gsi-ActivityParticipants',
      KeyConditionExpression: 'participationActivityId = :activityId',
      ExpressionAttributeValues: {
        ':activityId': activityId
      },
      LastEvaluatedKey: lastEvaluatedKey
    }).promise();
    lastEvaluatedKey = result.LastEvaluatedKey;
    participations.push(...result.Items);
  } while (lastEvaluatedKey);

  return participations;
}
