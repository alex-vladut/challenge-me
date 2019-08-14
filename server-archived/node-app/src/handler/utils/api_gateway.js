
const translate = ({
    statusCode = 200,
    body = {},
    headers = {}
}) => ({
    statusCode,
    body: JSON.stringify(body, true, 2),
    headers: {
        ...headers,
        'Access-Control-Allow-Origin': '*'
    }
});

module.exports = {
    translate
}