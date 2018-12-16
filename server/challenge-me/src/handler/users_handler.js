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
            body: JSON.stringify({ ...user.Item, version: undefined }, true, 2),
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

const createUser = async (event) => {
    console.log(JSON.stringify(event));
    const cognitoIdentityId = event.requestContext.identity.cognitoIdentityId;
    const profile = JSON.parse(event.body);
    try {
        const user = {
            'id': cognitoIdentityId,
            'name': profile.name,
            'coins': 10000,
            'version': 0
        }
        await dynamoDB.put({
            TableName: 'user',
            Item: user,
            ConditionExpression: 'attribute_not_exists(id)'
        }).promise();

        return {
            statusCode: 200,
            body: JSON.stringify(user),
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        };
    } catch (error) {
        console.log(JSON.stringify(error));
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }
    }
};

const getUsers = async (event) => {
    const response = await dynamoDB.scan({
        TableName: 'user'
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
    getUser,
    createUser,
    getUsers,
}