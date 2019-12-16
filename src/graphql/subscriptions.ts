// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreateUpdateParticipation = `subscription OnCreateUpdateParticipation($participationParticipantId: String!) {
  onCreateUpdateParticipation(
    participationParticipantId: $participationParticipantId
  ) {
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
export const onUpdateNotification = `subscription OnUpdateNotification($notificationUserId: String!) {
  onUpdateNotification(notificationUserId: $notificationUserId) {
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
export const onDeleteNotification = `subscription OnDeleteNotification($notificationUserId: String!) {
  onDeleteNotification(notificationUserId: $notificationUserId) {
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
export const onCreateNotification = `subscription OnCreateNotification {
  onCreateNotification {
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
