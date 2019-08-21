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
    createdAt
    updatedAt
    version
  }
}
`;

export const participationsByActivityId = `query ParticipationsByActivityId(
  $activityId: ID
  $sortDirection: ModelSortDirection
  $filter: ModelParticipationFilterInput
  $limit: Int
  $nextToken: String
) {
  participationsByActivityId(
    activityId: $activityId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      activityId
      participant {
        id
        name
      }
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
