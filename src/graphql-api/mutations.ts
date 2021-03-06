export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    id
    name
    pictureUrl
    email
    bio
    participations {
      items {
        id
        status
        activity {
          id
        }
      }
      nextToken
    }
    notifications(sortDirection: DESC) {
      items {
        id
        text
        read
        createdAt
        version
      }
      nextToken
    }
    version
  }
}
`;

export const createActivity = `mutation CreateActivity($input: CreateActivityInput!) {
  createActivity(input: $input) {
    id
    description
    sport
    owner {
      id
      name
      pictureUrl
      version
    }
    address
    location {
      lat
      lon
    }
    dateTime
    numberOfAttendants
    createdAt
    updatedAt
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

export const createParticipation = `mutation CreateParticipation($input: CreateParticipationInput!) {
  createParticipation(input: $input) {
    id
    activity {
      id
      description
      dateTime
      numberOfAttendants
      createdAt
      updatedAt
      sport
      version
    }
    participant {
      id
      name
      pictureUrl
      version
    }
    participationParticipantId
    status
  }
}
`;

export const updateParticipation = `mutation UpdateParticipation($input: UpdateParticipationInput!) {
  updateParticipation(input: $input) {
    id
    activity {
      id
      description
      dateTime
      numberOfAttendants
      createdAt
      updatedAt
      sport
      version
    }
    participant {
      id
      name
      pictureUrl
      version
    }
    participationParticipantId
    status
  }
}
`;

export const sendMessage = `mutation SendMessage($input: SendMessageInput!) {
  sendMessage(input: $input)
}
`;

export const createComment = `mutation CreateComment($input: CreateCommentInput!) {
  createComment(input: $input) {
    id
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
    notificationUserId
    text
    read
    createdAt
    updatedAt
    version
  }
}
`;

export const deleteNotification = `mutation DeleteNotification($input: DeleteNotificationInput!) {
  deleteNotification(input: $input) {
    id
    notificationUserId
    text
    read
    createdAt
    updatedAt
    version
  }
}
`;
