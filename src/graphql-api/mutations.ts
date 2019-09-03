export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    name
    pictureUrl
    activities {
      nextToken
    }
    version
  }
}
`;

export const createActivity = `mutation CreateActivity($input: CreateActivityInput!) {
  createActivity(input: $input) {
    id
    description
    sport
    owner {
      id
      name
      pictureUrl
      version
    }
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

export const deleteActivity = `mutation DeleteActivity($input: DeleteActivityInput!) {
  deleteActivity(input: $input) {
    id
    description
    owner {
      id
      name
      pictureUrl
      version
    }
    dateTime
    sport
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
export const createParticipation = `mutation CreateParticipation($input: CreateParticipationInput!) {
  createParticipation(input: $input) {
    id
    activity {
      id
      description
      dateTime
      numberOfAttendants
      createdAt
      updatedAt
      sport
      version
    }
    participant {
      id
      name
      pictureUrl
      version
    }
    activityId
    status
  }
}
`;

export const updateParticipation = `mutation UpdateParticipation($input: UpdateParticipationInput!) {
  updateParticipation(input: $input) {
    id
    activity {
      id
      description
      dateTime
      numberOfAttendants
      createdAt
      updatedAt
      sport
      version
    }
    participant {
      id
      name
      pictureUrl
      version
    }
    activityId
    status
  }
}
`;
