/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type CreateActivityInput = {
  id?: string | null,
  title: string,
  description: string,
  dateTime: string,
  numberOfAttendants: number,
  activityOwnerId?: string | null,
};

export type UpdateActivityInput = {
  id: string,
  title?: string | null,
  description?: string | null,
  dateTime?: string | null,
  numberOfAttendants?: number | null,
  activityOwnerId?: string | null,
  expectedVersion: number,
};

export type DeleteActivityInput = {
  id?: string | null,
  expectedVersion: number,
};

export type CreateChallengeInput = {
  id?: string | null,
  title: string,
  description: string,
  opponentStatus?: ParticipantApprovalStatus | null,
  refereeStatus?: ParticipantApprovalStatus | null,
  deadline: string,
  createdAt?: string | null,
  updatedAt?: string | null,
  challengeOwnerId?: string | null,
  challengeOpponentId: string,
  challengeRefereeId: string,
  challengeWinnerId?: string | null,
};

export enum ParticipantApprovalStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}


export type UpdateChallengeInput = {
  id: string,
  title?: string | null,
  description?: string | null,
  opponentStatus?: ParticipantApprovalStatus | null,
  refereeStatus?: ParticipantApprovalStatus | null,
  deadline?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  challengeOwnerId?: string | null,
  challengeOpponentId?: string | null,
  challengeRefereeId?: string | null,
  challengeWinnerId?: string | null,
  expectedVersion: number,
};

export type DeleteChallengeInput = {
  id?: string | null,
  expectedVersion: number,
};

export type CreateUserInput = {
  id?: string | null,
  name: string,
  pictureUrl?: string | null,
  activityAttendantsId?: string | null,
};

export type UpdateUserInput = {
  id: string,
  name?: string | null,
  pictureUrl?: string | null,
  activityAttendantsId?: string | null,
  expectedVersion: number,
};

export type DeleteUserInput = {
  id?: string | null,
  expectedVersion: number,
};

export type ModelActivityFilterInput = {
  id?: ModelIDFilterInput | null,
  title?: ModelStringFilterInput | null,
  description?: ModelStringFilterInput | null,
  dateTime?: ModelStringFilterInput | null,
  numberOfAttendants?: ModelIntFilterInput | null,
  and?: Array< ModelActivityFilterInput | null > | null,
  or?: Array< ModelActivityFilterInput | null > | null,
  not?: ModelActivityFilterInput | null,
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

export type ModelChallengeFilterInput = {
  id?: ModelIDFilterInput | null,
  title?: ModelStringFilterInput | null,
  description?: ModelStringFilterInput | null,
  opponentStatus?: ModelParticipantApprovalStatusFilterInput | null,
  refereeStatus?: ModelParticipantApprovalStatusFilterInput | null,
  deadline?: ModelStringFilterInput | null,
  createdAt?: ModelStringFilterInput | null,
  updatedAt?: ModelStringFilterInput | null,
  and?: Array< ModelChallengeFilterInput | null > | null,
  or?: Array< ModelChallengeFilterInput | null > | null,
  not?: ModelChallengeFilterInput | null,
};

export type ModelParticipantApprovalStatusFilterInput = {
  eq?: ParticipantApprovalStatus | null,
  ne?: ParticipantApprovalStatus | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDFilterInput | null,
  name?: ModelStringFilterInput | null,
  pictureUrl?: ModelStringFilterInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type SearchableUserFilterInput = {
  id?: SearchableIDFilterInput | null,
  name?: SearchableStringFilterInput | null,
  pictureUrl?: SearchableStringFilterInput | null,
  and?: Array< SearchableUserFilterInput | null > | null,
  or?: Array< SearchableUserFilterInput | null > | null,
  not?: SearchableUserFilterInput | null,
};

export type SearchableIDFilterInput = {
  ne?: string | null,
  eq?: string | null,
  match?: string | null,
  matchPhrase?: string | null,
  matchPhrasePrefix?: string | null,
  multiMatch?: string | null,
  exists?: boolean | null,
  wildcard?: string | null,
  regexp?: string | null,
};

export type SearchableStringFilterInput = {
  ne?: string | null,
  eq?: string | null,
  match?: string | null,
  matchPhrase?: string | null,
  matchPhrasePrefix?: string | null,
  multiMatch?: string | null,
  exists?: boolean | null,
  wildcard?: string | null,
  regexp?: string | null,
};

export type SearchableUserSortInput = {
  field?: SearchableUserSortableFields | null,
  direction?: SearchableSortDirection | null,
};

export enum SearchableUserSortableFields {
  id = "id",
  name = "name",
  pictureUrl = "pictureUrl",
}


export enum SearchableSortDirection {
  asc = "asc",
  desc = "desc",
}


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
    attendants:  {
      __typename: "ModelUserConnection",
      nextToken: string | null,
    } | null,
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
    attendants:  {
      __typename: "ModelUserConnection",
      nextToken: string | null,
    } | null,
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
    attendants:  {
      __typename: "ModelUserConnection",
      nextToken: string | null,
    } | null,
    version: number,
  } | null,
};

export type CreateChallengeMutationVariables = {
  input: CreateChallengeInput,
};

export type CreateChallengeMutation = {
  createChallenge:  {
    __typename: "Challenge",
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
    opponent:  {
      __typename: "User",
      id: string,
      name: string,
      pictureUrl: string | null,
      version: number,
    },
    opponentStatus: ParticipantApprovalStatus | null,
    referee:  {
      __typename: "User",
      id: string,
      name: string,
      pictureUrl: string | null,
      version: number,
    },
    refereeStatus: ParticipantApprovalStatus | null,
    deadline: string,
    winner:  {
      __typename: "User",
      id: string,
      name: string,
      pictureUrl: string | null,
      version: number,
    } | null,
    createdAt: string | null,
    updatedAt: string | null,
    version: number,
  } | null,
};

export type UpdateChallengeMutationVariables = {
  input: UpdateChallengeInput,
};

export type UpdateChallengeMutation = {
  updateChallenge:  {
    __typename: "Challenge",
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
    opponent:  {
      __typename: "User",
      id: string,
      name: string,
      pictureUrl: string | null,
      version: number,
    },
    opponentStatus: ParticipantApprovalStatus | null,
    referee:  {
      __typename: "User",
      id: string,
      name: string,
      pictureUrl: string | null,
      version: number,
    },
    refereeStatus: ParticipantApprovalStatus | null,
    deadline: string,
    winner:  {
      __typename: "User",
      id: string,
      name: string,
      pictureUrl: string | null,
      version: number,
    } | null,
    createdAt: string | null,
    updatedAt: string | null,
    version: number,
  } | null,
};

export type DeleteChallengeMutationVariables = {
  input: DeleteChallengeInput,
};

export type DeleteChallengeMutation = {
  deleteChallenge:  {
    __typename: "Challenge",
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
    opponent:  {
      __typename: "User",
      id: string,
      name: string,
      pictureUrl: string | null,
      version: number,
    },
    opponentStatus: ParticipantApprovalStatus | null,
    referee:  {
      __typename: "User",
      id: string,
      name: string,
      pictureUrl: string | null,
      version: number,
    },
    refereeStatus: ParticipantApprovalStatus | null,
    deadline: string,
    winner:  {
      __typename: "User",
      id: string,
      name: string,
      pictureUrl: string | null,
      version: number,
    } | null,
    createdAt: string | null,
    updatedAt: string | null,
    version: number,
  } | null,
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
    version: number,
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
    attendants:  {
      __typename: "ModelUserConnection",
      nextToken: string | null,
    } | null,
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
      version: number,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetChallengeQueryVariables = {
  id: string,
};

export type GetChallengeQuery = {
  getChallenge:  {
    __typename: "Challenge",
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
    opponent:  {
      __typename: "User",
      id: string,
      name: string,
      pictureUrl: string | null,
      version: number,
    },
    opponentStatus: ParticipantApprovalStatus | null,
    referee:  {
      __typename: "User",
      id: string,
      name: string,
      pictureUrl: string | null,
      version: number,
    },
    refereeStatus: ParticipantApprovalStatus | null,
    deadline: string,
    winner:  {
      __typename: "User",
      id: string,
      name: string,
      pictureUrl: string | null,
      version: number,
    } | null,
    createdAt: string | null,
    updatedAt: string | null,
    version: number,
  } | null,
};

export type ListChallengesQueryVariables = {
  filter?: ModelChallengeFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListChallengesQuery = {
  listChallenges:  {
    __typename: "ModelChallengeConnection",
    items:  Array< {
      __typename: "Challenge",
      id: string,
      title: string,
      description: string,
      opponentStatus: ParticipantApprovalStatus | null,
      refereeStatus: ParticipantApprovalStatus | null,
      deadline: string,
      createdAt: string | null,
      updatedAt: string | null,
      version: number,
    } | null > | null,
    nextToken: string | null,
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

export type SearchUsersQueryVariables = {
  filter?: SearchableUserFilterInput | null,
  sort?: SearchableUserSortInput | null,
  limit?: number | null,
  nextToken?: number | null,
};

export type SearchUsersQuery = {
  searchUsers:  {
    __typename: "SearchableUserConnection",
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
    attendants:  {
      __typename: "ModelUserConnection",
      nextToken: string | null,
    } | null,
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
    attendants:  {
      __typename: "ModelUserConnection",
      nextToken: string | null,
    } | null,
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
    attendants:  {
      __typename: "ModelUserConnection",
      nextToken: string | null,
    } | null,
    version: number,
  } | null,
};

export type OnCreateChallengeSubscription = {
  onCreateChallenge:  {
    __typename: "Challenge",
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
    opponent:  {
      __typename: "User",
      id: string,
      name: string,
      pictureUrl: string | null,
      version: number,
    },
    opponentStatus: ParticipantApprovalStatus | null,
    referee:  {
      __typename: "User",
      id: string,
      name: string,
      pictureUrl: string | null,
      version: number,
    },
    refereeStatus: ParticipantApprovalStatus | null,
    deadline: string,
    winner:  {
      __typename: "User",
      id: string,
      name: string,
      pictureUrl: string | null,
      version: number,
    } | null,
    createdAt: string | null,
    updatedAt: string | null,
    version: number,
  } | null,
};

export type OnUpdateChallengeSubscription = {
  onUpdateChallenge:  {
    __typename: "Challenge",
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
    opponent:  {
      __typename: "User",
      id: string,
      name: string,
      pictureUrl: string | null,
      version: number,
    },
    opponentStatus: ParticipantApprovalStatus | null,
    referee:  {
      __typename: "User",
      id: string,
      name: string,
      pictureUrl: string | null,
      version: number,
    },
    refereeStatus: ParticipantApprovalStatus | null,
    deadline: string,
    winner:  {
      __typename: "User",
      id: string,
      name: string,
      pictureUrl: string | null,
      version: number,
    } | null,
    createdAt: string | null,
    updatedAt: string | null,
    version: number,
  } | null,
};

export type OnDeleteChallengeSubscription = {
  onDeleteChallenge:  {
    __typename: "Challenge",
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
    opponent:  {
      __typename: "User",
      id: string,
      name: string,
      pictureUrl: string | null,
      version: number,
    },
    opponentStatus: ParticipantApprovalStatus | null,
    referee:  {
      __typename: "User",
      id: string,
      name: string,
      pictureUrl: string | null,
      version: number,
    },
    refereeStatus: ParticipantApprovalStatus | null,
    deadline: string,
    winner:  {
      __typename: "User",
      id: string,
      name: string,
      pictureUrl: string | null,
      version: number,
    } | null,
    createdAt: string | null,
    updatedAt: string | null,
    version: number,
  } | null,
};

export type OnCreateUserSubscription = {
  onCreateUser:  {
    __typename: "User",
    id: string,
    name: string,
    pictureUrl: string | null,
    version: number,
  } | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser:  {
    __typename: "User",
    id: string,
    name: string,
    pictureUrl: string | null,
    version: number,
  } | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser:  {
    __typename: "User",
    id: string,
    name: string,
    pictureUrl: string | null,
    version: number,
  } | null,
};
