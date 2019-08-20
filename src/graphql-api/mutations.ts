export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    name
    pictureUrl
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
    attendants {
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
    attendants {
      nextToken
    }
    createdAt
    updatedAt
    version
  }
}
`;
