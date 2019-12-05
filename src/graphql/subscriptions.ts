// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreateParticipation = `subscription OnCreateParticipation($participationParticipantId: String!) {
  onCreateParticipation(
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
      version
    }
    participant {
      id
      name
      pictureUrl
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
export const onUpdateParticipation = `subscription OnUpdateParticipation($participationParticipantId: String!) {
  onUpdateParticipation(
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
      version
    }
    participant {
      id
      name
      pictureUrl
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
