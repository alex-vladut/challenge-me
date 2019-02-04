const uuidv4 = require('uuid/v4');

//TODO Vaidate the input
const create = ({
    ownerId,
    opponentId,
    refereeId,
    title,
    deadline
}) => ({
    id: uuidv4(),
    ownerId,
    opponentId,
    refereeId,
    title,
    deadline,
    version: 0
});

module.exports = {
    create
}