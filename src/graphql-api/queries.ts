export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    name
    pictureUrl
    email
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
    owner {
      id
      name
      pictureUrl
      email
    }
    description
    sport
    dateTime
    numberOfAttendants
    participants {
      items {
        id
        status
        participant {
          id
          name
          pictureUrl
        }
      }
      nextToken
    }
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
      status
      participant {
        id
        name
        pictureUrl
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
      description
      dateTime
      numberOfAttendants
      owner {
        id
        name
        pictureUrl
      }
      createdAt
      sport
      updatedAt
      version
    }
    nextToken
  }
}
`;
