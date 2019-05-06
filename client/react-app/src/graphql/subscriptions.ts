// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreateChallenge = `subscription OnCreateChallenge {
  onCreateChallenge {
    id
    title
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
    version
  }
}
`;
export const onUpdateChallenge = `subscription OnUpdateChallenge {
  onUpdateChallenge {
    id
    title
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
    version
  }
}
`;
export const onDeleteChallenge = `subscription OnDeleteChallenge {
  onDeleteChallenge {
    id
    title
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
    version
  }
}
`;
export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
    id
    name
    pictureUrl
    version
  }
}
`;
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
    id
    name
    pictureUrl
    version
  }
}
`;
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
    id
    name
    pictureUrl
    version
  }
}
`;
