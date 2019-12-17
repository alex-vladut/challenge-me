export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    name
    pictureUrl
    email
    bio
    participations {
      items {
        id
        status
        activity {
          id
        }
      }
      nextToken
    }
    notifications(sortDirection: DESC) {
      items {
        id
        text
      }
      nextToken
    }
    version
  }
}
`;

export const getUserRead = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    name
    pictureUrl
    bio
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
        createdAt
        version
        participant {
          id
          name
          pictureUrl
        }
      }
      nextToken
    }
    comments(sortDirection: DESC) {
      items {
        id
        text
        createdAt
        version
        user {
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

export const fetchMoreComments = `query GetActivity($id: ID!, $nextToken: String!) {
  getActivity(id: $id) {
    comments(sortDirection: DESC, nextToken: $nextToken) {
      items {
        id
        text
        createdAt
        version
        user {
          id
          name
          pictureUrl
        }
      }
      nextToken
    }
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
  }
}
`;
