// eslint-disable
// this is an auto generated file. This will be overwritten

export const createChallenge = `mutation CreateChallenge($input: CreateChallengeInput!) {
  createChallenge(input: $input) {
    id
    title
    rules
    betAmount
    owner
    opponentId
    refereeId
    deadline
    version
  }
}
`;
export const updateChallenge = `mutation UpdateChallenge($input: UpdateChallengeInput!) {
  updateChallenge(input: $input) {
    id
    title
    rules
    betAmount
    owner
    opponentId
    refereeId
    deadline
    version
  }
}
`;
export const deleteChallenge = `mutation DeleteChallenge($input: DeleteChallengeInput!) {
  deleteChallenge(input: $input) {
    id
    title
    rules
    betAmount
    owner
    opponentId
    refereeId
    deadline
    version
  }
}
`;
