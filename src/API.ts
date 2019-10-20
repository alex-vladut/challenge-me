/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type DeleteActivityInput = {
  id: string,
  expectedVersion: number,
};

export type CreateUserInput = {
  id?: string | null,
  name: string,
  pictureUrl?: string | null,
  email?: string | null,
};

export type UpdateUserInput = {
  id: string,
  name?: string | null,
  pictureUrl?: string | null,
  email?: string | null,
  expectedVersion: number,
};

export type DeleteUserInput = {
  id?: string | null,
  expectedVersion: number,
};

export type CreateActivityInput = {
  id?: string | null,
  description: string,
  sport: string,
  dateTime: string,
  numberOfAttendants: number,
  location: LocationInput,
  createdAt?: string | null,
  updatedAt?: string | null,
  activityOwnerId?: string | null,
};

export type LocationInput = {
  latitude: number,
  longitude: number,
  address: string,
};

export type CreateParticipationInput = {
  id?: string | null,
  status: ParticipationStatus,
  participationActivityId: string,
  participationParticipantId: string,
};

export enum ParticipationStatus {
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}


export type UpdateParticipationInput = {
  id: string,
  status?: ParticipationStatus | null,
  expectedVersion: number,
  participationActivityId?: string | null,
  participationParticipantId?: string | null,
};

export type DeleteParticipationInput = {
  id?: string | null,
  expectedVersion: number,
};

export type ModelUserFilterInput = {
  id?: ModelIDFilterInput | null,
  name?: ModelStringFilterInput | null,
  pictureUrl?: ModelStringFilterInput | null,
  email?: ModelStringFilterInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelIDFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelStringFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelActivityFilterInput = {
  id?: ModelIDFilterInput | null,
  description?: ModelStringFilterInput | null,
  sport?: ModelStringFilterInput | null,
  dateTime?: ModelStringFilterInput | null,
  numberOfAttendants?: ModelIntFilterInput | null,
  createdAt?: ModelStringFilterInput | null,
  updatedAt?: ModelStringFilterInput | null,
  and?: Array< ModelActivityFilterInput | null > | null,
  or?: Array< ModelActivityFilterInput | null > | null,
  not?: ModelActivityFilterInput | null,
};

export type ModelIntFilterInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  contains?: number | null,
  notContains?: number | null,
  between?: Array< number | null > | null,
};

export type ModelParticipationFilterInput = {
  id?: ModelIDFilterInput | null,
  status?: ModelParticipationStatusFilterInput | null,
  and?: Array< ModelParticipationFilterInput | null > | null,
  or?: Array< ModelParticipationFilterInput | null > | null,
  not?: ModelParticipationFilterInput | null,
};

export type ModelParticipationStatusFilterInput = {
  eq?: ParticipationStatus | null,
  ne?: ParticipationStatus | null,
};

export type DeleteActivityMutationVariables = {
  input: DeleteActivityInput,
};

export type DeleteActivityMutation = {
  deleteActivity:  {
    __typename: "Activity",
    id: string,
    owner:  {
      __typename: "User",
      id: string,
      name: string,
      pictureUrl: string | null,
      email: string | null,
      version: number,
    } | null,
    description: string,
    sport: string,
    dateTime: string,
    numberOfAttendants: number,
    location:  {
      __typename: "Location",
      latitude: number,
      longitude: number,
      address: string,
    },
    participations:  {
      __typename: "ModelParticipationConnection",
      nextToken: string | null,
    } | null,
    createdAt: string | null,
    updatedAt: string | null,
    version: number,
  },
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
};

export type CreateUserMutation = {
  createUser:  {
    __typename: "User",
    id: string,
    name: string,
    pictureUrl: string | null,
    email: string | null,
    activities:  {
      __typename: "ModelParticipationConnection",
      nextToken: string | null,
    } | null,
    version: number,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
};

export type UpdateUserMutation = {
  updateUser:  {
    __typename: "User",
    id: string,
    name: string,
    pictureUrl: string | null,
    email: string | null,
    activities:  {
      __typename: "ModelParticipationConnection",
      nextToken: string | null,
    } | null,
    version: number,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
};

export type DeleteUserMutation = {
  deleteUser:  {
    __typename: "User",
    id: string,
    name: string,
    pictureUrl: string | null,
    email: string | null,
    activities:  {
      __typename: "ModelParticipationConnection",
      nextToken: string | null,
    } | null,
    version: number,
  } | null,
};

export type CreateActivityMutationVariables = {
  input: CreateActivityInput,
};

export type CreateActivityMutation = {
  createActivity:  {
    __typename: "Activity",
    id: string,
    owner:  {
      __typename: "User",
      id: string,
      name: string,
      pictureUrl: string | null,
      email: string | null,
      version: number,
    } | null,
    description: string,
    sport: string,
    dateTime: string,
    numberOfAttendants: number,
    location:  {
      __typename: "Location",
      latitude: number,
      longitude: number,
      address: string,
    },
    participations:  {
      __typename: "ModelParticipationConnection",
      nextToken: string | null,
    } | null,
    createdAt: string | null,
    updatedAt: string | null,
    version: number,
  } | null,
};

export type CreateParticipationMutationVariables = {
  input: CreateParticipationInput,
};

export type CreateParticipationMutation = {
  createParticipation:  {
    __typename: "Participation",
    id: string,
    activity:  {
      __typename: "Activity",
      id: string,
      description: string,
      sport: string,
      dateTime: string,
      numberOfAttendants: number,
      createdAt: string | null,
      updatedAt: string | null,
      version: number,
    },
    participant:  {
      __typename: "User",
      id: string,
      name: string,
      pictureUrl: string | null,
      email: string | null,
      version: number,
    },
    status: ParticipationStatus,
    version: number,
  } | null,
};

export type UpdateParticipationMutationVariables = {
  input: UpdateParticipationInput,
};

export type UpdateParticipationMutation = {
  updateParticipation:  {
    __typename: "Participation",
    id: string,
    activity:  {
      __typename: "Activity",
      id: string,
      description: string,
      sport: string,
      dateTime: string,
      numberOfAttendants: number,
      createdAt: string | null,
      updatedAt: string | null,
      version: number,
    },
    participant:  {
      __typename: "User",
      id: string,
      name: string,
      pictureUrl: string | null,
      email: string | null,
      version: number,
    },
    status: ParticipationStatus,
    version: number,
  } | null,
};

export type DeleteParticipationMutationVariables = {
  input: DeleteParticipationInput,
};

export type DeleteParticipationMutation = {
  deleteParticipation:  {
    __typename: "Participation",
    id: string,
    activity:  {
      __typename: "Activity",
      id: string,
      description: string,
      sport: string,
      dateTime: string,
      numberOfAttendants: number,
      createdAt: string | null,
      updatedAt: string | null,
      version: number,
    },
    participant:  {
      __typename: "User",
      id: string,
      name: string,
      pictureUrl: string | null,
      email: string | null,
      version: number,
    },
    status: ParticipationStatus,
    version: number,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser:  {
    __typename: "User",
    id: string,
    name: string,
    pictureUrl: string | null,
    email: string | null,
    activities:  {
      __typename: "ModelParticipationConnection",
      nextToken: string | null,
    } | null,
    version: number,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      name: string,
      pictureUrl: string | null,
      email: string | null,
      version: number,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetActivityQueryVariables = {
  id: string,
};

export type GetActivityQuery = {
  getActivity:  {
    __typename: "Activity",
    id: string,
    owner:  {
      __typename: "User",
      id: string,
      name: string,
      pictureUrl: string | null,
      email: string | null,
      version: number,
    } | null,
    description: string,
    sport: string,
    dateTime: string,
    numberOfAttendants: number,
    location:  {
      __typename: "Location",
      latitude: number,
      longitude: number,
      address: string,
    },
    participations:  {
      __typename: "ModelParticipationConnection",
      nextToken: string | null,
    } | null,
    createdAt: string | null,
    updatedAt: string | null,
    version: number,
  } | null,
};

export type ListActivitysQueryVariables = {
  filter?: ModelActivityFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListActivitysQuery = {
  listActivitys:  {
    __typename: "ModelActivityConnection",
    items:  Array< {
      __typename: "Activity",
      id: string,
      description: string,
      sport: string,
      dateTime: string,
      numberOfAttendants: number,
      createdAt: string | null,
      updatedAt: string | null,
      version: number,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetParticipationQueryVariables = {
  id: string,
};

export type GetParticipationQuery = {
  getParticipation:  {
    __typename: "Participation",
    id: string,
    activity:  {
      __typename: "Activity",
      id: string,
      description: string,
      sport: string,
      dateTime: string,
      numberOfAttendants: number,
      createdAt: string | null,
      updatedAt: string | null,
      version: number,
    },
    participant:  {
      __typename: "User",
      id: string,
      name: string,
      pictureUrl: string | null,
      email: string | null,
      version: number,
    },
    status: ParticipationStatus,
    version: number,
  } | null,
};

export type ListParticipationsQueryVariables = {
  filter?: ModelParticipationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListParticipationsQuery = {
  listParticipations:  {
    __typename: "ModelParticipationConnection",
    items:  Array< {
      __typename: "Participation",
      id: string,
      status: ParticipationStatus,
      version: number,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateUserSubscription = {
  onCreateUser:  {
    __typename: "User",
    id: string,
    name: string,
    pictureUrl: string | null,
    email: string | null,
    activities:  {
      __typename: "ModelParticipationConnection",
      nextToken: string | null,
    } | null,
    version: number,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  id: string,
};

export type OnUpdateUserSubscription = {
  onUpdateUser:  {
    __typename: "User",
    id: string,
    name: string,
    pictureUrl: string | null,
    email: string | null,
    activities:  {
      __typename: "ModelParticipationConnection",
      nextToken: string | null,
    } | null,
    version: number,
  } | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser:  {
    __typename: "User",
    id: string,
    name: string,
    pictureUrl: string | null,
    email: string | null,
    activities:  {
      __typename: "ModelParticipationConnection",
      nextToken: string | null,
    } | null,
    version: number,
  } | null,
};

export type OnCreateParticipationSubscription = {
  onCreateParticipation:  {
    __typename: "Participation",
    id: string,
    activity:  {
      __typename: "Activity",
      id: string,
      description: string,
      sport: string,
      dateTime: string,
      numberOfAttendants: number,
      createdAt: string | null,
      updatedAt: string | null,
      version: number,
    },
    participant:  {
      __typename: "User",
      id: string,
      name: string,
      pictureUrl: string | null,
      email: string | null,
      version: number,
    },
    status: ParticipationStatus,
    version: number,
  } | null,
};

export type OnUpdateParticipationSubscription = {
  onUpdateParticipation:  {
    __typename: "Participation",
    id: string,
    activity:  {
      __typename: "Activity",
      id: string,
      description: string,
      sport: string,
      dateTime: string,
      numberOfAttendants: number,
      createdAt: string | null,
      updatedAt: string | null,
      version: number,
    },
    participant:  {
      __typename: "User",
      id: string,
      name: string,
      pictureUrl: string | null,
      email: string | null,
      version: number,
    },
    status: ParticipationStatus,
    version: number,
  } | null,
};

export type OnDeleteParticipationSubscription = {
  onDeleteParticipation:  {
    __typename: "Participation",
    id: string,
    activity:  {
      __typename: "Activity",
      id: string,
      description: string,
      sport: string,
      dateTime: string,
      numberOfAttendants: number,
      createdAt: string | null,
      updatedAt: string | null,
      version: number,
    },
    participant:  {
      __typename: "User",
      id: string,
      name: string,
      pictureUrl: string | null,
      email: string | null,
      version: number,
    },
    status: ParticipationStatus,
    version: number,
  } | null,
};
