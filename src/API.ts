/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  id?: string | null,
  name: string,
  pictureUrl?: string | null,
};

export type UpdateUserInput = {
  id: string,
  name?: string | null,
  pictureUrl?: string | null,
  expectedVersion: number,
};

export type DeleteUserInput = {
  id?: string | null,
  expectedVersion: number,
};

export type CreateActivityInput = {
  id?: string | null,
  title: string,
  description: string,
  dateTime: string,
  numberOfAttendants: number,
  createdAt?: string | null,
  updatedAt?: string | null,
  activityOwnerId?: string | null,
};

export type UpdateActivityInput = {
  id: string,
  title?: string | null,
  description?: string | null,
  dateTime?: string | null,
  numberOfAttendants?: number | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  activityOwnerId?: string | null,
  expectedVersion: number,
};

export type DeleteActivityInput = {
  id?: string | null,
  expectedVersion: number,
};

export type CreateParticipationInput = {
  id?: string | null,
  activityId: string,
  participationActivityId: string,
  participationParticipantId: string,
};

export type UpdateParticipationInput = {
  id: string,
  activityId?: string | null,
  participationActivityId?: string | null,
  participationParticipantId?: string | null,
};

export type DeleteParticipationInput = {
  id?: string | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDFilterInput | null,
  name?: ModelStringFilterInput | null,
  pictureUrl?: ModelStringFilterInput | null,
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
  title?: ModelStringFilterInput | null,
  description?: ModelStringFilterInput | null,
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
  activityId?: ModelIDFilterInput | null,
  and?: Array< ModelParticipationFilterInput | null > | null,
  or?: Array< ModelParticipationFilterInput | null > | null,
  not?: ModelParticipationFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type CreateUserMutationVariables = {
  input: CreateUserInput,
};

export type CreateUserMutation = {
  createUser:  {
    __typename: "User",
    id: string,
    name: string,
    pictureUrl: string | null,
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
    title: string,
    description: string,
    owner:  {
      __typename: "User",
      id: string,
      name: string,
      pictureUrl: string | null,
      version: number,
    } | null,
    dateTime: string,
    numberOfAttendants: number,
    participants:  {
      __typename: "ModelParticipationConnection",
      nextToken: string | null,
    } | null,
    createdAt: string | null,
    updatedAt: string | null,
    version: number,
  } | null,
};

export type UpdateActivityMutationVariables = {
  input: UpdateActivityInput,
};

export type UpdateActivityMutation = {
  updateActivity:  {
    __typename: "Activity",
    id: string,
    title: string,
    description: string,
    owner:  {
      __typename: "User",
      id: string,
      name: string,
      pictureUrl: string | null,
      version: number,
    } | null,
    dateTime: string,
    numberOfAttendants: number,
    participants:  {
      __typename: "ModelParticipationConnection",
      nextToken: string | null,
    } | null,
    createdAt: string | null,
    updatedAt: string | null,
    version: number,
  } | null,
};

export type DeleteActivityMutationVariables = {
  input: DeleteActivityInput,
};

export type DeleteActivityMutation = {
  deleteActivity:  {
    __typename: "Activity",
    id: string,
    title: string,
    description: string,
    owner:  {
      __typename: "User",
      id: string,
      name: string,
      pictureUrl: string | null,
      version: number,
    } | null,
    dateTime: string,
    numberOfAttendants: number,
    participants:  {
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
      title: string,
      description: string,
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
      version: number,
    },
    activityId: string,
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
      title: string,
      description: string,
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
      version: number,
    },
    activityId: string,
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
      title: string,
      description: string,
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
      version: number,
    },
    activityId: string,
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
    title: string,
    description: string,
    owner:  {
      __typename: "User",
      id: string,
      name: string,
      pictureUrl: string | null,
      version: number,
    } | null,
    dateTime: string,
    numberOfAttendants: number,
    participants:  {
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
      title: string,
      description: string,
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
      title: string,
      description: string,
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
      version: number,
    },
    activityId: string,
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
      activityId: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type ParticipationsByActivityIdQueryVariables = {
  activityId?: string | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelParticipationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ParticipationsByActivityIdQuery = {
  participationsByActivityId:  {
    __typename: "ModelParticipationConnection",
    items:  Array< {
      __typename: "Participation",
      id: string,
      activityId: string,
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
    activities:  {
      __typename: "ModelParticipationConnection",
      nextToken: string | null,
    } | null,
    version: number,
  } | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser:  {
    __typename: "User",
    id: string,
    name: string,
    pictureUrl: string | null,
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
    activities:  {
      __typename: "ModelParticipationConnection",
      nextToken: string | null,
    } | null,
    version: number,
  } | null,
};

export type OnCreateActivitySubscription = {
  onCreateActivity:  {
    __typename: "Activity",
    id: string,
    title: string,
    description: string,
    owner:  {
      __typename: "User",
      id: string,
      name: string,
      pictureUrl: string | null,
      version: number,
    } | null,
    dateTime: string,
    numberOfAttendants: number,
    participants:  {
      __typename: "ModelParticipationConnection",
      nextToken: string | null,
    } | null,
    createdAt: string | null,
    updatedAt: string | null,
    version: number,
  } | null,
};

export type OnUpdateActivitySubscription = {
  onUpdateActivity:  {
    __typename: "Activity",
    id: string,
    title: string,
    description: string,
    owner:  {
      __typename: "User",
      id: string,
      name: string,
      pictureUrl: string | null,
      version: number,
    } | null,
    dateTime: string,
    numberOfAttendants: number,
    participants:  {
      __typename: "ModelParticipationConnection",
      nextToken: string | null,
    } | null,
    createdAt: string | null,
    updatedAt: string | null,
    version: number,
  } | null,
};

export type OnDeleteActivitySubscription = {
  onDeleteActivity:  {
    __typename: "Activity",
    id: string,
    title: string,
    description: string,
    owner:  {
      __typename: "User",
      id: string,
      name: string,
      pictureUrl: string | null,
      version: number,
    } | null,
    dateTime: string,
    numberOfAttendants: number,
    participants:  {
      __typename: "ModelParticipationConnection",
      nextToken: string | null,
    } | null,
    createdAt: string | null,
    updatedAt: string | null,
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
      title: string,
      description: string,
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
      version: number,
    },
    activityId: string,
  } | null,
};

export type OnUpdateParticipationSubscription = {
  onUpdateParticipation:  {
    __typename: "Participation",
    id: string,
    activity:  {
      __typename: "Activity",
      id: string,
      title: string,
      description: string,
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
      version: number,
    },
    activityId: string,
  } | null,
};

export type OnDeleteParticipationSubscription = {
  onDeleteParticipation:  {
    __typename: "Participation",
    id: string,
    activity:  {
      __typename: "Activity",
      id: string,
      title: string,
      description: string,
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
      version: number,
    },
    activityId: string,
  } | null,
};
