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

export const listActivities = `query ListActivitys(
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
      owner {
        id
        name
        pictureUrl
        version
      }
      createdAt
      updatedAt
      version
    }
    nextToken
  }
}
`;
