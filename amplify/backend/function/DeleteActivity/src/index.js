/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION
var apiChallengeMeGraphQLGraphQLAPIIdOutput = process.env.API_CHALLENGEMEGRAPHQL_GRAPHQLAPIIDOUTPUT
var apiChallengeMeGraphQLGraphQLAPIEndpointOutput = process.env.API_CHALLENGEMEGRAPHQL_GRAPHQLAPIENDPOINTOUTPUT

Amplify Params - DO NOT EDIT */

const { deleteActivity } = require('./delete-activity.handler');
const { deleteActivityParticipations } = require('./delete-activity-participations.handler');
const { deleteActivityComments } = require('./delete-activity-comments.handler');

const handlers = {
  deleteActivity,
  deleteActivityParticipations,
  deleteActivityComments
};

exports.handler = async event => {
  const handler = handlers[event.action];
  if (handler) {
    return await handler(event);
  }
  throw new Error("Handler not found!");
};
