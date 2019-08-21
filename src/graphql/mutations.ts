// tslint:disable
// this is an auto generated file. This will be overwritten

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
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
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
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
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
    title
    description
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
export const updateActivity = `mutation UpdateActivity($input: UpdateActivityInput!) {
  updateActivity(input: $input) {
    id
    title
    description
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
    title
    description
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
export const createParticipation = `mutation CreateParticipation($input: CreateParticipationInput!) {
  createParticipation(input: $input) {
    id
    activity {
      id
      title
      description
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
      version
    }
  }
}
`;
export const updateParticipation = `mutation UpdateParticipation($input: UpdateParticipationInput!) {
  updateParticipation(input: $input) {
    id
    activity {
      id
      title
      description
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
      version
    }
  }
}
`;
export const deleteParticipation = `mutation DeleteParticipation($input: DeleteParticipationInput!) {
  deleteParticipation(input: $input) {
    id
    activity {
      id
      title
      description
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
      version
    }
  }
}
`;
