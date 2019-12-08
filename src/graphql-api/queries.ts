export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    name
    pictureUrl
    email
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
