const ddbGeo = require('dynamodb-geo');
const AWS = require('aws-sdk');

AWS.config.update({ region: process.env.REGION });

const ACTIVITIES_TABLE = process.env.ACTIVITIES_TABLE;

const ddb = new AWS.DynamoDB();
const config = new ddbGeo.GeoDataManagerConfiguration(ddb, ACTIVITIES_TABLE);
config.hashKeyLength = 4;

const myGeoTableManager = new ddbGeo.GeoDataManager(config);

const validate = event => {
  if (!event.identity || !event.identity.username) {
    throw new Error('Unauthorized');
  }
  if (!event.arguments || !event.arguments.location || !event.arguments.km) {
    throw new Error('Missing input');
  }
}

exports.handler = async event => {
  validate(event);

  const { location, km } = event.arguments;

  const results = await myGeoTableManager.queryRadius({
    RadiusInMeter: km * 1000,
    CenterPoint: {
      latitude: location.lat,
      longitude: location.lon
    }
  });
  const items = results.map(item => ({
    id: item.id.S,
    activityOwnerId: item.activityOwnerId.S,
    description: item.description.S,
    sport: item.sport.S,
    dateTime: item.dateTime.S,
    numberOfAttendants: Number(item.numberOfAttendants.N),
    location: {
      lat: Number(item.location.M.lat.N),
      lon: Number(item.location.M.lon.N)
    },
    address: item.address.S,
    createdAt: item.createdAt.S,
    updatedAt: item.updatedAt.S,
    version: Number(item.version.N)
  }));
  return { items, total: items.length };
};
