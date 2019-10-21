const AWS = require('aws-sdk');

const endpoint = new AWS.Endpoint(process.env.ELASTIC_SEARCH_ENDPOINT);
const credentials = new AWS.EnvironmentCredentials('AWS');

const deleteIndexRequest = () => {
  const request = new AWS.HttpRequest(endpoint);

  request.method = 'DELETE';
  request.path = '/activity'
  request.region = process.env.REGION;
  request.headers['presigned-expires'] = false;
  request.headers['Host'] = endpoint.host;

  return request;
};

const createIndexRequest = () => {
  const request = new AWS.HttpRequest(endpoint);

  request.method = 'PUT';
  request.path = '/activity'
  request.region = process.env.REGION;
  request.headers['presigned-expires'] = false;
  request.headers['Host'] = endpoint.host;

  return request;
}

const createGeoPointMappingRequest = () => {
  const request = new AWS.HttpRequest(endpoint);

  request.method = 'PUT';
  request.path = '/activity/_mapping/doc'
  request.body = JSON.stringify({
    properties: {
      location: {
        type: "geo_point"
      }
    }
  });
  request.region = process.env.REGION;
  request.headers['presigned-expires'] = false;
  request.headers['Host'] = endpoint.host;
  request.headers['Content-Type'] = "application/json";

  return request;
}

const sendRequest = async request => {
  // Sign the request (SigV4)
  const signer = new AWS.Signers.V4(request, 'es');
  signer.addAuthorization(credentials, new Date());

  // Post document to ES
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

/**
 * AWS Amplify doesn't support at the moment GeoLocation, even though Elasticsearch supports it out-of-the-box.
 * As a result I created this Lambda function with the goal of mapping a field called "location" in "Activity" object to a "geo_point" type in Elasticsearch.
 * To prevent any unnecessary issues make sure you run this Lambda function (manually from AWS Console - maybe I could find a way to run it automatically)
 * right after the ES domain was provisioned,
 * otherwise data may be lost. Caveat: once an index is created in ES you cannot update its mappings, so you have to recreate it from scratch.
 */
exports.handler = async () => {
  let deleteRes = null;
  try {
    // delete existing index if exists
    await sendRequest(deleteIndexRequest());
  } catch (_) { /**/ }

  // recreate index
  const createRes = await sendRequest(createIndexRequest());

  // create "location" mapping
  const mapRes = await sendRequest(createGeoPointMappingRequest());

  return { deleteRes, createRes, mapRes };
};
