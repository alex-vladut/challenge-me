const challengeService = require('../../domain/service/challenge_service');
const challengeRepository = require('../../repository/challenge_repository');

const createChallenge = async ({
    command,
    principal
}) => {
    const challenge = challengeService.create({
        ...command,
        ownerId: principal
    });
    await challengeRepository.save({ challenge });
    return challenge.id;
};

module.exports = {
    createChallenge
}