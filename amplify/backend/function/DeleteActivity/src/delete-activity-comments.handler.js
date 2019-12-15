const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient({ region: process.env.REGION });

const COMMENTS_TABLE = process.env.COMMENTS_TABLE;

exports.deleteActivityComments = async event => {
  const comments = await findActivityComments(event.activityId);
  if (comments.length) {
    await dynamoDb
      .batchWrite({ RequestItems: { [COMMENTS_TABLE]: comments.map(createDeleteRequest) } })
      .promise();
  }
  return {};
};

const createDeleteRequest = comment => ({
  DeleteRequest: {
    Key: {
      id: comment.id
    }
  }
})

const findActivityComments = async activityId => {
  const comments = [];
  let lastEvaluatedKey = null;
  do {
    const result = await dynamoDb.query({
      TableName: COMMENTS_TABLE,
      IndexName: 'gsi-ActivityComments',
      KeyConditionExpression: 'commentActivityId = :activityId',
      ExpressionAttributeValues: {
        ':activityId': activityId
      },
      LastEvaluatedKey: lastEvaluatedKey
    }).promise();
    lastEvaluatedKey = result.LastEvaluatedKey;
    comments.push(...result.Items);
  } while (lastEvaluatedKey);

  return comments;
}
