const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuidv4 = require('uuid/v4');

const getChallenge = async (event) => {
    const challengeId = event.pathParameters.challengeId;
    const challenge = await dynamoDb.get({
        TableName: 'challenge',
        Key: {
            id: challengeId
        }
    }).promise();
    if (challenge.Item) {
        return {
            statusCode: 200,
            body: JSON.stringify(challenge.Item, true, 2),
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }
    } else {
        return {
            statusCode: 404,
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }
    }
};

const createChallenge = async (event) => {
    const challenge = JSON.parse(event.body);
    const newChallenge = {
        ...challenge,
        ownerId: event.requestContext.identity.cognitoIdentityId,
        id: uuidv4(),
        version: 0
    }
    await dynamoDb.put({
        TableName: 'challenge',
        Item: newChallenge,
        ConditionExpression: 'attribute_not_exists(id)'
    }).promise();

    return {
        statusCode: 200,
        body: JSON.stringify(newChallenge),
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    };
};

const getChallenges = async () => {
    const response = await dynamoDb.scan({
        TableName: 'challenge'
    }).promise();
    return {
        statusCode: 200,
        body: JSON.stringify(response.Items, true, 2),
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    };
};

module.exports = {
    getChallenge,
    getChallenges,
    createChallenge
}