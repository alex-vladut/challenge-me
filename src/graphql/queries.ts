// tslint:disable
// this is an auto generated file. This will be overwritten

export const nearbyActivities = `query NearbyActivities($location: LocationInput!, $km: Int) {
  nearbyActivities(location: $location, km: $km) {
    items {
      id
      description
      sport
      dateTime
      numberOfAttendants
      address
      createdAt
      updatedAt
      version
    }
    total
    nextToken
  }
}
`;
export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    name
    pictureUrl
    email
    activities {
      nextToken
    }
    comments {
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
    location {
      lat
      lon
    }
    address
    participations {
      nextToken
    }
    comments {
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
      address
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
      address
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
    status
    createdAt
    updatedAt
    version
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
      status
      createdAt
      updatedAt
      version
    }
    nextToken
  }
}
`;
export const getComment = `query GetComment($id: ID!) {
  getComment(id: $id) {
    id
    activity {
      id
      description
      sport
      dateTime
      numberOfAttendants
      address
      createdAt
      updatedAt
      version
    }
    user {
      id
      name
      pictureUrl
      email
      version
    }
    text
    createdAt
    updatedAt
    version
  }
}
`;
export const listComments = `query ListComments(
  $filter: ModelCommentFilterInput
  $limit: Int
  $nextToken: String
) {
  listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      text
      createdAt
      updatedAt
      version
    }
    nextToken
  }
}
`;
export const searchActivitys = `query SearchActivitys(
  $filter: SearchableActivityFilterInput
  $sort: SearchableActivitySortInput
  $limit: Int
  $nextToken: String
) {
  searchActivitys(
    filter: $filter
    sort: $sort
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      description
      sport
      dateTime
      numberOfAttendants
      address
      createdAt
      updatedAt
      version
    }
    nextToken
    total
  }
}
`;
