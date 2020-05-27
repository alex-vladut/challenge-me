/*
  this file will loop through all js modules which are uploaded to the lambda resource,
  provided that the file names (without extension) are included in the "MODULES" env variable.
  "MODULES" is a comma-delimmited string.
*/

exports.lambdaHandler = async (event, context, callback) => {
  const modules = process.env.MODULES.split(',');
  for (const currentModule of modules) {
    const { handler } = require(`./${currentModule}`);
    await handler(event, context, callback);
  }
};
