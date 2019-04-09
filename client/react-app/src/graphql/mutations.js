// eslint-disable
// this is an auto generated file. This will be overwritten

export const createChallenge = `mutation CreateChallenge($input: CreateChallengeInput!) {
  createChallenge(input: $input) {
    id
    title
    owner {
      id
      name
      version
    }
    opponent {
      id
      name
      version
    }
    referee {
      id
      name
      version
    }
    deadline
    version
  }
}
`;
export const updateChallenge = `mutation UpdateChallenge($input: UpdateChallengeInput!) {
  updateChallenge(input: $input) {
    id
    title
    owner {
      id
      name
      version
    }
    opponent {
      id
      name
      version
    }
    referee {
      id
      name
      version
    }
    deadline
    version
  }
}
`;
export const deleteChallenge = `mutation DeleteChallenge($input: DeleteChallengeInput!) {
  deleteChallenge(input: $input) {
    id
    title
    owner {
      id
      name
      version
    }
    opponent {
      id
      name
      version
    }
    referee {
      id
      name
      version
    }
    deadline
    version
  }
}
`;
export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    name
    version
  }
}
`;
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    id
    name
    version
  }
}
`;
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
    id
    name
    version
  }
}
`;
