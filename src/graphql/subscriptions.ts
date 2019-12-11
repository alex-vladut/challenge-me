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
