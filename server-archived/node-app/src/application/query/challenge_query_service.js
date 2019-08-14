const challengeRepository = require('../../repository/challenge_repository');

const getChallengeById = ({
    challengeId
}) => challengeRepository.findById({ challengeId });

const getChallenges = () => challengeRepository.getAllChallenges();

module.exports = {
    getChallengeById,
    getChallenges
}