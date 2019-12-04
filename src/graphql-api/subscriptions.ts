// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreateParticipation = `subscription OnCreateParticipation($participationParticipantId: String!) {
  onCreateParticipation(
    participationParticipantId: $participationParticipantId
  ) {
    id
    activity {
      id
    }
    participationParticipantId
    status
    createdAt
    updatedAt
    version
  }
}
`;
export const onUpdateParticipation = `subscription OnUpdateParticipation($id: ID) {
  onUpdateParticipation(id: $id) {
    id
    activity {
      id
    }
    status
    createdAt
    updatedAt
    version
  }
}
`;
