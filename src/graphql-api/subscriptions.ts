// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreateUpdateParticipation = `subscription OnCreateUpdateParticipation($participationParticipantId: String!) {
  onCreateUpdateParticipation(
    participationParticipantId: $participationParticipantId
  ) {
    id
    activity {
      id
    }
    status
  }
}
`;

export const onUpdateNotification = `subscription OnUpdateNotification($notificationUserId: String!) {
  onUpdateNotification(notificationUserId: $notificationUserId) {
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

export const onDeleteNotification = `subscription OnDeleteNotification($notificationUserId: String!) {
  onDeleteNotification(notificationUserId: $notificationUserId) {
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

export const onCreateNotification = `subscription OnCreateNotification($notificationUserId: String!) {
  onCreateNotification(notificationUserId: $notificationUserId) {
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
