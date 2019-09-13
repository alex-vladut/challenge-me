// tslint:disable
// this is an auto generated file. This will be overwritten

export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    name
    pictureUrl
    email
    activities {
      nextToken
    }
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
      email
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
      version
    }
    description
    sport
    dateTime
    numberOfAttendants
    participants {
      nextToken
    }
    createdAt
    updatedAt
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
      description
      sport
      dateTime
      numberOfAttendants
      createdAt
      updatedAt
      version
    }
    nextToken
  }
}
`;
export const getParticipation = `query GetParticipation($id: ID!) {
  getParticipation(id: $id) {
    id
    activity {
      id
      description
      sport
      dateTime
      numberOfAttendants
      createdAt
      updatedAt
      version
    }
    participant {
      id
      name
      pictureUrl
      email
      version
    }
    activityId
    status
  }
}
`;
export const listParticipations = `query ListParticipations(
  $filter: ModelParticipationFilterInput
  $limit: Int
  $nextToken: String
) {
  listParticipations(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      activityId
      status
    }
    nextToken
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
    }
    nextToken
  }
}
`;
