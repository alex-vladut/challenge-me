const challengeRepository = require('../../repository/challenge_repository');

const getChallengeById = ({
    challengeId
}) => challengeRepository.findById({ challengeId });

module.exports = {
    getChallengeById
}