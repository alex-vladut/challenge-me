// tslint:disable
// this is an auto generated file. This will be overwritten

export const createActivity = `mutation CreateActivity($input: CreateActivityInput!) {
  createActivity(input: $input) {
    id
    owner {
      id
      name
      pictureUrl
      bio
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
    comments {
      nextToken
    }
    createdAt
    updatedAt
    hashKey
    rangeKey
    geohash
    version
  }
}
`;
export const deleteActivity = `mutation DeleteActivity($input: DeleteActivityInput!) {
  deleteActivity(input: $input) {
    id
  }
}
`;
export const sendMessage = `mutation SendMessage($input: SendMessageInput!) {
  sendMessage(input: $input)
}
`;
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    id
    name
    pictureUrl
    bio
    email
    participations {
      nextToken
    }
    notifications {
      nextToken
    }
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
      hashKey
      rangeKey
      geohash
      version
    }
    participant {
      id
      name
      pictureUrl
      bio
      email
      version
    }
    participationParticipantId
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
      hashKey
      rangeKey
      geohash
      version
    }
    participant {
      id
      name
      pictureUrl
      bio
      email
      version
    }
    participationParticipantId
    status
    createdAt
    updatedAt
    version
  }
}
`;
export const createComment = `mutation CreateComment($input: CreateCommentInput!) {
  createComment(input: $input) {
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
      hashKey
      rangeKey
      geohash
      version
    }
    user {
      id
      name
      pictureUrl
      bio
      email
      version
    }
    text
    createdAt
    updatedAt
    version
  }
}
`;
export const updateNotification = `mutation UpdateNotification($input: UpdateNotificationInput!) {
  updateNotification(input: $input) {
    id
    user {
      id
      name
      pictureUrl
      bio
      email
      version
    }
    text
    createdAt
    updatedAt
    version
  }
}
`;
export const deleteNotification = `mutation DeleteNotification($input: DeleteNotificationInput!) {
  deleteNotification(input: $input) {
    id
    user {
      id
      name
      pictureUrl
      bio
      email
      version
    }
    text
    createdAt
    updatedAt
    version
  }
}
`;
export const createNotification = `mutation CreateNotification($input: CreateNotificationInput!) {
  createNotification(input: $input) {
    id
    user {
      id
      name
      pictureUrl
      bio
      email
      version
    }
    text
    createdAt
    updatedAt
    version
  }
}
`;
