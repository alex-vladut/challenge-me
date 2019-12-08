const uuid = require('uuid');
const { DateTime } = require('luxon');
const ddbGeo = require('dynamodb-geo');
const AWS = require('aws-sdk');

AWS.config.update({ region: process.env.REGION });

const ACTIVITIES_TABLE = process.env.ACTIVITIES_TABLE;

const ddb = new AWS.DynamoDB();
const dynamoDb = new AWS.DynamoDB.DocumentClient({ region: process.env.REGION });
const config = new ddbGeo.GeoDataManagerConfiguration(ddb, ACTIVITIES_TABLE);
config.hashKeyLength = 4;

const myGeoTableManager = new ddbGeo.GeoDataManager(config);

const validate = event => {
  if (!event.identity || !event.identity.username) {
    throw new Error('Unauthorized');
  }
  if (!event.arguments || !event.arguments.input) {
    throw new Error('Missing input');
  }
}

exports.handler = async event => {
  validate(event);

  const identityId = event.identity.username;
  const input = event.arguments.input;

  const activityId = uuid.v4();
  const activity = {
    RangeKeyValue: { S: activityId },
    GeoPoint: {
      latitude: input.location.lat,
      longitude: input.location.lon
    },
    PutItemInput: {
      Item: {
        __typename: { S: 'Activity' },
        id: { S: activityId },
        activityOwnerId: { S: identityId },
        description: { S: input.description },
        sport: { S: input.sport },
        dateTime: { S: input.dateTime },
        numberOfAttendants: { N: `${input.numberOfAttendants}` },
        location: {
          M: {
            lat: { N: `${input.location.lat}` },
            lon: { N: `${input.location.lon}` }
          }
        },
        address: { S: input.address },
        createdAt: { S: DateTime.utc().toISO() },
        updatedAt: { S: DateTime.utc().toISO() },
        version: { N: '1' },
      }
    }
  };

  await myGeoTableManager.putPoint(activity).promise();

  // using DynamoDBClient to perform the deserialization automatically
  const result = await dynamoDb.get({
    TableName: ACTIVITIES_TABLE,
    Key: { id: activityId }
  }).promise();
  return result.Item;
};
