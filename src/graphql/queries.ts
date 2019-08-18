// tslint:disable
// this is an auto generated file. This will be overwritten

export const getActivity = `query GetActivity($id: ID!) {
  getActivity(id: $id) {
    id
    title
    description
    owner {
      id
      name
      pictureUrl
      version
    }
    dateTime
    numberOfAttendants
    attendants {
      nextToken
    }
    version
  }
}
`;
export const listActivitys = `query ListActivitys(
  $filter: ModelActivityFilterInput
  $limit: Int
  $nextToken: String
) {
  listActivitys(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      title
      description
      dateTime
      numberOfAttendants
      version
    }
    nextToken
  }
}
`;
export const getChallenge = `query GetChallenge($id: ID!) {
  getChallenge(id: $id) {
    id
    title
    description
    owner {
      id
      name
      pictureUrl
      version
    }
    opponent {
      id
      name
      pictureUrl
      version
    }
    opponentStatus
    referee {
      id
      name
      pictureUrl
      version
    }
    refereeStatus
    deadline
    winner {
      id
      name
      pictureUrl
      version
    }
    createdAt
    updatedAt
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
      description
      owner {
        id
        name
        pictureUrl
        version
      }
      opponent {
        id
        name
        pictureUrl
        version
      }
      referee {
        id
        name
        pictureUrl
        version
      }
      opponentStatus
      refereeStatus
      deadline
      createdAt
      updatedAt
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
    pictureUrl
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
      pictureUrl
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
      pictureUrl
      version
    }
    nextToken
  }
}
`;
