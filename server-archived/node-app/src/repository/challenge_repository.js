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

const save = async ({
    challenge
}) => {
    if (!challenge.version) {
        await dynamoDb.put({
            TableName: 'challenge',
            Item: newChallenge,
            ConditionExpression: 'attribute_not_exists(id)'
        }).promise();
    }
    // TODO Add logic for updating the Challenge if already exists
};

const getAllChallenges = async () => {
    const response = await dynamoDb.scan({
        TableName: 'challenge'
    }).promise();
    return response.Items;
};


module.exports = {
    findById,
    save,
    getAllChallenges
}