// tslint:disable
// this is an auto generated file. This will be overwritten

export const deleteActivity = `mutation DeleteActivity($input: DeleteActivityInput!) {
  deleteActivity(input: $input) {
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
    createdAt
    updatedAt
    version
  }
}
`;
export const sendMessage = `mutation SendMessage($input: SendMessageInput!) {
  sendMessage(input: $input)
}
`;
export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
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
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
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
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
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
export const createActivity = `mutation CreateActivity($input: CreateActivityInput!) {
  createActivity(input: $input) {
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
export const updateParticipation = `mutation UpdateParticipation($input: UpdateParticipationInput!) {
  updateParticipation(input: $input) {
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
export const deleteParticipation = `mutation DeleteParticipation($input: DeleteParticipationInput!) {
  deleteParticipation(input: $input) {
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
