// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
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
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
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
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
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
export const onCreateActivity = `subscription OnCreateActivity {
  onCreateActivity {
    id
    owner {
      id
      name
      pictureUrl
      version
    }
    description
    sport
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
export const onUpdateActivity = `subscription OnUpdateActivity {
  onUpdateActivity {
    id
    owner {
      id
      name
      pictureUrl
      version
    }
    description
    sport
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
export const onDeleteActivity = `subscription OnDeleteActivity {
  onDeleteActivity {
    id
    owner {
      id
      name
      pictureUrl
      version
    }
    description
    sport
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
    }
    activityId
    status
  }
}
`;
