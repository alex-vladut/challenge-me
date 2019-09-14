exports.handler = async event => {
  return event.prev.result;
};
