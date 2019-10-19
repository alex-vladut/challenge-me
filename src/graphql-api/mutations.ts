export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    id
    name
    pictureUrl
    email
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
