// tslint:disable
// this is an auto generated file. This will be overwritten

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
    attendants {
      nextToken
    }
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
    attendants {
      nextToken
    }
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
    attendants {
      nextToken
    }
    version
  }
}
`;
export const createChallenge = `mutation CreateChallenge($input: CreateChallengeInput!) {
  createChallenge(input: $input) {
    id
    title
    description
    owner {
      id
      name
      pictureUrl
      version
    }
    opponent {
      id
      name
      pictureUrl
      version
    }
    opponentStatus
    referee {
      id
      name
      pictureUrl
      version
    }
    refereeStatus
    deadline
    winner {
      id
      name
      pictureUrl
      version
    }
    createdAt
    updatedAt
    version
  }
}
`;
export const updateChallenge = `mutation UpdateChallenge($input: UpdateChallengeInput!) {
  updateChallenge(input: $input) {
    id
    title
    description
    owner {
      id
      name
      pictureUrl
      version
    }
    opponent {
      id
      name
      pictureUrl
      version
    }
    opponentStatus
    referee {
      id
      name
      pictureUrl
      version
    }
    refereeStatus
    deadline
    winner {
      id
      name
      pictureUrl
      version
    }
    createdAt
    updatedAt
    version
  }
}
`;
export const deleteChallenge = `mutation DeleteChallenge($input: DeleteChallengeInput!) {
  deleteChallenge(input: $input) {
    id
    title
    description
    owner {
      id
      name
      pictureUrl
      version
    }
    opponent {
      id
      name
      pictureUrl
      version
    }
    opponentStatus
    referee {
      id
      name
      pictureUrl
      version
    }
    refereeStatus
    deadline
    winner {
      id
      name
      pictureUrl
      version
    }
    createdAt
    updatedAt
    version
  }
}
`;
export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    name
    pictureUrl
    version
  }
}
`;
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    id
    name
    pictureUrl
    version
  }
}
`;
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
    id
    name
    pictureUrl
    version
  }
}
`;
