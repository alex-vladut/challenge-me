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
export const onUpdateActivity = `subscription OnUpdateActivity {
  onUpdateActivity {
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
export const onDeleteActivity = `subscription OnDeleteActivity {
  onDeleteActivity {
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
export const onCreateParticipation = `subscription OnCreateParticipation {
  onCreateParticipation {
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
export const onUpdateParticipation = `subscription OnUpdateParticipation {
  onUpdateParticipation {
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
export const onDeleteParticipation = `subscription OnDeleteParticipation {
  onDeleteParticipation {
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
