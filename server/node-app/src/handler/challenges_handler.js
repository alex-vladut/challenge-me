const challengeQueryService = require('../application/query/challenge_query_service');
const challengeCommandService = require('../application/command/challenge_command_service');

const apiGateway = require('./utils/api_gateway');

const getChallenge = async (event) => {
    const challengeId = event.pathParameters.challengeId;
    const challenge = await challengeQueryService.getChallengeById({ challengeId });
    return challenge ?
        apiGateway.translate({ body: challenge })
        : apiGateway.translate({ statusCode: 404 });
};

const createChallenge = async (event) => {
    const challengeId = await challengeCommandService.createChallenge({
        command: JSON.parse(event.body),
        principal: event.requestContext.identity.cognitoIdentityId
    });
    return apiGateway.translate({
        headers: {
            'Location': `/challenges/${challengeId}`
        }
    });
};

//TODO Sort it out in order to get the Challenges of a given User
const getChallenges = async () => {
    const challenges = await challengeQueryService.getChallenges();
    return apiGateway.translate({body:challenges});
};

module.exports = {
    getChallenge,
    getChallenges,
    createChallenge
}