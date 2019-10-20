/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION

Amplify Params - DO NOT EDIT */

exports.handler = event => { //eslint-disable-line
  console.log(`EVENT = ${event}`);
  return 'Hello World';
};
