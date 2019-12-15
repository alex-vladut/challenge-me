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
