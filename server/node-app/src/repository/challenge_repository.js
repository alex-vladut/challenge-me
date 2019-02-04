const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const findById = async ({
    challengeId
}) => {
    const challenge = await dynamoDb.get({
        TableName: 'challenge',
        Key: {
            id: challengeId
        }
    }).promise();
    return challenge.Item || undefined;
};

module.exports = {
    findById
}