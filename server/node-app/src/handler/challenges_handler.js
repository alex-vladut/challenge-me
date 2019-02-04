const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuidv4 = require('uuid/v4');

const challengeQueryService = require('../application/query/challenge_query_service');
const apiGateway = require('./utils/api_gateway');

const getChallenge = async (event) => {
    const challengeId = event.pathParameters.challengeId;
    const challenge = await challengeQueryService.getChallengeById({ challengeId });
    return challenge ?
        apiGateway.translate({ body: challenge })
        : apiGateway.translate({ statusCode: 404 });
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

//TODO Sort it out in order to get the Challenges of a given User
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