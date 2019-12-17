// tslint:disable
// this is an auto generated file. This will be overwritten

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
    bio
    email
    participations {
      nextToken
    }
    notifications {
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
      bio
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
      bio
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
export const getNotification = `query GetNotification($id: ID!) {
  getNotification(id: $id) {
    id
    user {
      id
      name
      pictureUrl
      bio
      email
      version
    }
    notificationUserId
    text
    read
    createdAt
    updatedAt
    version
  }
}
`;
export const listNotifications = `query ListNotifications(
  $filter: ModelNotificationFilterInput
  $limit: Int
  $nextToken: String
) {
  listNotifications(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      notificationUserId
      text
      read
      createdAt
      updatedAt
      version
    }
    nextToken
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
