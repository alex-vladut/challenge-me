// eslint-disable
// this is an auto generated file. This will be overwritten

export const getChallenge = `query GetChallenge($id: ID!) {
  getChallenge(id: $id) {
    id
    title
    owner {
      id
      name
      version
    }
    opponent {
      id
      name
      version
    }
    opponentStatus
    referee {
      id
      name
      version
    }
    refereeStatus
    deadline
    winner {
      id
      name
      version
    }
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
      owner {
        id
        name
        version
      }
      opponent {
        id
        name
        version
      }
      opponentStatus
      referee {
        id
        name
        version
      }
      refereeStatus
      deadline
      winner {
        id
        name
        version
      }
      version
    }
    nextToken
  }
}
`;
export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    name
    version
  }
}
`;
export const listUsers = `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      version
    }
    nextToken
  }
}
`;
export const searchUsers = `query SearchUsers(
  $filter: SearchableUserFilterInput
  $sort: SearchableUserSortInput
  $limit: Int
  $nextToken: Int
) {
  searchUsers(
    filter: $filter
    sort: $sort
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      name
      version
    }
    nextToken
  }
}
`;
