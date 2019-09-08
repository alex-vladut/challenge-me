// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreateUser = `subscription OnCreateUser($owner: String!) {
  onCreateUser(owner: $owner) {
    id
    name
    pictureUrl
    activities {
      nextToken
    }
    version
    owner
  }
}
`;
export const onUpdateUser = `subscription OnUpdateUser($owner: String!) {
  onUpdateUser(owner: $owner) {
    id
    name
    pictureUrl
    activities {
      nextToken
    }
    version
    owner
  }
}
`;
export const onDeleteUser = `subscription OnDeleteUser($owner: String!) {
  onDeleteUser(owner: $owner) {
    id
    name
    pictureUrl
    activities {
      nextToken
    }
    version
    owner
  }
}
`;
export const onCreateParticipation = `subscription OnCreateParticipation {
  onCreateParticipation {
    id
    activity {
      id
      description
      sport
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
      owner
    }
    activityId
    status
  }
}
`;
export const onUpdateParticipation = `subscription OnUpdateParticipation {
  onUpdateParticipation {
    id
    activity {
      id
      description
      sport
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
      owner
    }
    activityId
    status
  }
}
`;
export const onDeleteParticipation = `subscription OnDeleteParticipation {
  onDeleteParticipation {
    id
    activity {
      id
      description
      sport
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
      owner
    }
    activityId
    status
  }
}
`;
