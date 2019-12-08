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
      hashKey
      rangeKey
      geohash
      version
    }
    total
    nextToken
  }
}
`;
export const nearbyActivitiesDdb = `query NearbyActivitiesDdb($location: LocationInput!, $km: Int) {
  nearbyActivitiesDdb(location: $location, km: $km) {
    items {
      id
      description
      sport
      dateTime
      numberOfAttendants
      address
      createdAt
      updatedAt
      hashKey
      rangeKey
      geohash
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
    participations {
      nextToken
    }
    version
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
    hashKey
    rangeKey
    geohash
    version
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
      hashKey
      rangeKey
      geohash
      version
    }
    participant {
      id
      name
      pictureUrl
      email
      version
    }
    participationParticipantId
    status
    createdAt
    updatedAt
    version
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
      hashKey
      rangeKey
      geohash
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
export const byGeolocation = `query ByGeolocation(
  $hashKey: Int
  $rangeKey: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelActivityFilterInput
  $limit: Int
  $nextToken: String
) {
  byGeolocation(
    hashKey: $hashKey
    rangeKey: $rangeKey
    sortDirection: $sortDirection
    filter: $filter
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
      hashKey
      rangeKey
      geohash
      version
    }
    nextToken
  }
}
`;
export const byHashByGeohash = `query ByHashByGeohash(
  $hashKey: Int
  $geohash: ModelIntKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelActivityFilterInput
  $limit: Int
  $nextToken: String
) {
  byHashByGeohash(
    hashKey: $hashKey
    geohash: $geohash
    sortDirection: $sortDirection
    filter: $filter
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
      hashKey
      rangeKey
      geohash
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
      hashKey
      rangeKey
      geohash
      version
    }
    nextToken
    total
  }
}
`;
