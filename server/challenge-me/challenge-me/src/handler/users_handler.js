const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const getUser = async (event) => {
    const cognitoIdentityId = event.requestContext.identity.cognitoIdentityId;
    const user = await dynamoDb.get({
        TableName: 'user',
        Key: {
            id: cognitoIdentityId
        }
    }).promise();
    if (user.Item) {
        return {
            statusCode: 200,
            body: JSON.stringify(user.Item, true, 2),
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

module.exports = {
    getUser,
}