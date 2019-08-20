// tslint:disable
// this is an auto generated file. This will be overwritten

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
    attendants {
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
    attendants {
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
    attendants {
      nextToken
    }
    createdAt
    updatedAt
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
