// eslint-disable
// this is an auto generated file. This will be overwritten

export const getChallenge = `query GetChallenge($id: ID!) {
  getChallenge(id: $id) {
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
export const listChallenges = `query ListChallenges(
  $filter: ModelChallengeFilterInput
  $limit: Int
  $nextToken: String
) {
  listChallenges(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
