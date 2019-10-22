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
    location {
      lat
      lon
    }
    address
    participations {
      items {
        id
        status
        version
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

export const nearbyActivities = `query NearbyActivities($location: LocationInput!, $km: Int) {
  nearbyActivities(location: $location, km: $km) {
    items {
      id
      description
      sport
      dateTime
      numberOfAttendants
      address
      location {
        lat
        lon
      }
      owner {
        id
        name
        pictureUrl
      }
      createdAt
      updatedAt
      version
    }
    nextToken
  }
}
`;
