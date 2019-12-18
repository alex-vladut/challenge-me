const AWS = require('aws-sdk');

const endpoint = new AWS.Endpoint(process.env.API_CHALLENGEMEGRAPHQL_GRAPHQLAPIENDPOINTOUTPUT);
const credentials = new AWS.EnvironmentCredentials('AWS');

exports.notifyDeleteActivityFailed = async (event) => {
  const request = new AWS.HttpRequest(endpoint);
  request.method = 'POST';
  request.region = process.env.REGION;
  request.headers['Host'] = endpoint.host;
  request.headers['Content-Type'] = 'multipart/form-data';
  request.body = JSON.stringify({
    query: 'mutation CreateNotification($input: CreateNotificationInput!) { createNotification(input: $input) {  id text read notificationUserId createdAt updatedAt version } }',
    variables: {
      input: {
        notificationUserId: event.identityId,
        text: 'We encountered a problem while attempting to delete your activity. Please try again later and feel free to contact us if the problem persists.',
        read: false
      }
    }
  });

  const signer = new AWS.Signers.V4(request, 'appsync', true);
  signer.addAuthorization(credentials, new Date());

  const result = await new Promise((resolve, reject) => {
    const send = new AWS.NodeHttpClient();
    send.handleRequest(request, null, httpResp => {
      let body = '';
      httpResp.on('data', chunk => body += chunk);
      httpResp.on('end', () => resolve(body));
    }, err => reject(err));
  });

  return result;
}