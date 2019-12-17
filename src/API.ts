/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type CreateActivityInput = {
  description: string,
  sport: string,
  dateTime: string,
  numberOfAttendants: number,
  location: LocationInput,
  address: string,
  activityOwnerId?: string | null,
};

export type LocationInput = {
  lat: number,
  lon: number,
};

export type DeleteActivityInput = {
  id: string,
  expectedVersion: number,
};

export type SendMessageInput = {
  name: string,
  email: string,
  message: string,
};

export type UpdateUserInput = {
  id: string,
  name?: string | null,
  pictureUrl?: string | null,
  bio?: string | null,
  email?: string | null,
  expectedVersion: number,
};

export type CreateParticipationInput = {
  id?: string | null,
  participationParticipantId?: string | null,
  status: ParticipationStatus,
  createdAt?: string | null,
  updatedAt?: string | null,
  participationActivityId: string,
};

export enum ParticipationStatus {
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}


export type UpdateParticipationInput = {
  id: string,
  participationParticipantId?: string | null,
  status?: ParticipationStatus | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  expectedVersion: number,
  participationActivityId?: string | null,
};

export type CreateCommentInput = {
  id?: string | null,
  text: string,
  createdAt?: string | null,
  updatedAt?: string | null,
  commentActivityId: string,
  commentUserId?: string | null,
};

export type UpdateNotificationInput = {
  id: string,
  notificationUserId?: string | null,
  text?: string | null,
  read?: boolean | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  expectedVersion: number,
};

export type DeleteNotificationInput = {
  id?: string | null,
  expectedVersion: number,
};

export type CreateNotificationInput = {
  id?: string | null,
  notificationUserId?: string | null,
  text: string,
  read?: boolean | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type ModelNotificationFilterInput = {
  id?: ModelIDFilterInput | null,
  notificationUserId?: ModelStringFilterInput | null,
  text?: ModelStringFilterInput | null,
  read?: ModelBooleanFilterInput | null,
  createdAt?: ModelStringFilterInput | null,
  updatedAt?: ModelStringFilterInput | null,
  and?: Array< ModelNotificationFilterInput | null > | null,
  or?: Array< ModelNotificationFilterInput | null > | null,
  not?: ModelNotificationFilterInput | null,
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

export type ModelBooleanFilterInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelActivityFilterInput = {
  id?: ModelIDFilterInput | null,
  description?: ModelStringFilterInput | null,
  sport?: ModelStringFilterInput | null,
  dateTime?: ModelStringFilterInput | null,
  numberOfAttendants?: ModelIntFilterInput | null,
  address?: ModelStringFilterInput | null,
  createdAt?: ModelStringFilterInput | null,
  updatedAt?: ModelStringFilterInput | null,
  hashKey?: ModelIntFilterInput | null,
  rangeKey?: ModelStringFilterInput | null,
  geohash?: ModelIntFilterInput | null,
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
  between?: Array< number | null > | null,
};

export type ModelIntKeyConditionInput = {
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
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
      bio: string | null,
      email: string | null,
      version: number,
    } | null,
    description: string,
    sport: string,
    dateTime: string,
    numberOfAttendants: number,
    location:  {
      __typename: "Location",
      lat: number,
      lon: number,
    },
    address: string,
    participations:  {
      __typename: "ModelParticipationConnection",
      nextToken: string | null,
    } | null,
    comments:  {
      __typename: "ModelCommentConnection",
      nextToken: string | null,
    } | null,
    createdAt: string | null,
    updatedAt: string | null,
    hashKey: number,
    rangeKey: string,
    geohash: number,
    version: number,
  },
};

export type DeleteActivityMutationVariables = {
  input: DeleteActivityInput,
};

export type DeleteActivityMutation = {
  deleteActivity:  {
    __typename: "DeleteActivityResult",
    id: string,
  },
};

export type SendMessageMutationVariables = {
  input: SendMessageInput,
};

export type SendMessageMutation = {
  sendMessage: string | null,
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
    bio: string | null,
    email: string | null,
    participations:  {
      __typename: "ModelParticipationConnection",
      nextToken: string | null,
    } | null,
    notifications:  {
      __typename: "ModelNotificationConnection",
      nextToken: string | null,
    } | null,
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
      address: string,
      createdAt: string | null,
      updatedAt: string | null,
      hashKey: number,
      rangeKey: string,
      geohash: number,
      version: number,
    },
    participant:  {
      __typename: "User",
      id: string,
      name: string,
      pictureUrl: string | null,
      bio: string | null,
      email: string | null,
      version: number,
    } | null,
    participationParticipantId: string | null,
    status: ParticipationStatus,
    createdAt: string | null,
    updatedAt: string | null,
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
      address: string,
      createdAt: string | null,
      updatedAt: string | null,
      hashKey: number,
      rangeKey: string,
      geohash: number,
      version: number,
    },
    participant:  {
      __typename: "User",
      id: string,
      name: string,
      pictureUrl: string | null,
      bio: string | null,
      email: string | null,
      version: number,
    } | null,
    participationParticipantId: string | null,
    status: ParticipationStatus,
    createdAt: string | null,
    updatedAt: string | null,
    version: number,
  } | null,
};

export type CreateCommentMutationVariables = {
  input: CreateCommentInput,
};

export type CreateCommentMutation = {
  createComment:  {
    __typename: "Comment",
    id: string,
    activity:  {
      __typename: "Activity",
      id: string,
      description: string,
      sport: string,
      dateTime: string,
      numberOfAttendants: number,
      address: string,
      createdAt: string | null,
      updatedAt: string | null,
      hashKey: number,
      rangeKey: string,
      geohash: number,
      version: number,
    },
    user:  {
      __typename: "User",
      id: string,
      name: string,
      pictureUrl: string | null,
      bio: string | null,
      email: string | null,
      version: number,
    } | null,
    text: string,
    createdAt: string | null,
    updatedAt: string | null,
    version: number,
  } | null,
};

export type UpdateNotificationMutationVariables = {
  input: UpdateNotificationInput,
};

export type UpdateNotificationMutation = {
  updateNotification:  {
    __typename: "Notification",
    id: string,
    user:  {
      __typename: "User",
      id: string,
      name: string,
      pictureUrl: string | null,
      bio: string | null,
      email: string | null,
      version: number,
    } | null,
    notificationUserId: string | null,
    text: string,
    read: boolean | null,
    createdAt: string | null,
    updatedAt: string | null,
    version: number,
  } | null,
};

export type DeleteNotificationMutationVariables = {
  input: DeleteNotificationInput,
};

export type DeleteNotificationMutation = {
  deleteNotification:  {
    __typename: "Notification",
    id: string,
    user:  {
      __typename: "User",
      id: string,
      name: string,
      pictureUrl: string | null,
      bio: string | null,
      email: string | null,
      version: number,
    } | null,
    notificationUserId: string | null,
    text: string,
    read: boolean | null,
    createdAt: string | null,
    updatedAt: string | null,
    version: number,
  } | null,
};

export type CreateNotificationMutationVariables = {
  input: CreateNotificationInput,
};

export type CreateNotificationMutation = {
  createNotification:  {
    __typename: "Notification",
    id: string,
    user:  {
      __typename: "User",
      id: string,
      name: string,
      pictureUrl: string | null,
      bio: string | null,
      email: string | null,
      version: number,
    } | null,
    notificationUserId: string | null,
    text: string,
    read: boolean | null,
    createdAt: string | null,
    updatedAt: string | null,
    version: number,
  } | null,
};

export type NearbyActivitiesDdbQueryVariables = {
  location: LocationInput,
  km?: number | null,
};

export type NearbyActivitiesDdbQuery = {
  nearbyActivitiesDdb:  {
    __typename: "ActivityConnection",
    items:  Array< {
      __typename: "Activity",
      id: string,
      description: string,
      sport: string,
      dateTime: string,
      numberOfAttendants: number,
      address: string,
      createdAt: string | null,
      updatedAt: string | null,
      hashKey: number,
      rangeKey: string,
      geohash: number,
      version: number,
    } | null > | null,
    total: number | null,
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
    bio: string | null,
    email: string | null,
    participations:  {
      __typename: "ModelParticipationConnection",
      nextToken: string | null,
    } | null,
    notifications:  {
      __typename: "ModelNotificationConnection",
      nextToken: string | null,
    } | null,
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
    owner:  {
      __typename: "User",
      id: string,
      name: string,
      pictureUrl: string | null,
      bio: string | null,
      email: string | null,
      version: number,
    } | null,
    description: string,
    sport: string,
    dateTime: string,
    numberOfAttendants: number,
    location:  {
      __typename: "Location",
      lat: number,
      lon: number,
    },
    address: string,
    participations:  {
      __typename: "ModelParticipationConnection",
      nextToken: string | null,
    } | null,
    comments:  {
      __typename: "ModelCommentConnection",
      nextToken: string | null,
    } | null,
    createdAt: string | null,
    updatedAt: string | null,
    hashKey: number,
    rangeKey: string,
    geohash: number,
    version: number,
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
      address: string,
      createdAt: string | null,
      updatedAt: string | null,
      hashKey: number,
      rangeKey: string,
      geohash: number,
      version: number,
    },
    participant:  {
      __typename: "User",
      id: string,
      name: string,
      pictureUrl: string | null,
      bio: string | null,
      email: string | null,
      version: number,
    } | null,
    participationParticipantId: string | null,
    status: ParticipationStatus,
    createdAt: string | null,
    updatedAt: string | null,
    version: number,
  } | null,
};

export type GetNotificationQueryVariables = {
  id: string,
};

export type GetNotificationQuery = {
  getNotification:  {
    __typename: "Notification",
    id: string,
    user:  {
      __typename: "User",
      id: string,
      name: string,
      pictureUrl: string | null,
      bio: string | null,
      email: string | null,
      version: number,
    } | null,
    notificationUserId: string | null,
    text: string,
    read: boolean | null,
    createdAt: string | null,
    updatedAt: string | null,
    version: number,
  } | null,
};

export type ListNotificationsQueryVariables = {
  filter?: ModelNotificationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListNotificationsQuery = {
  listNotifications:  {
    __typename: "ModelNotificationConnection",
    items:  Array< {
      __typename: "Notification",
      id: string,
      notificationUserId: string | null,
      text: string,
      read: boolean | null,
      createdAt: string | null,
      updatedAt: string | null,
      version: number,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type ByGeolocationQueryVariables = {
  hashKey?: number | null,
  rangeKey?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelActivityFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ByGeolocationQuery = {
  byGeolocation:  {
    __typename: "ModelActivityConnection",
    items:  Array< {
      __typename: "Activity",
      id: string,
      description: string,
      sport: string,
      dateTime: string,
      numberOfAttendants: number,
      address: string,
      createdAt: string | null,
      updatedAt: string | null,
      hashKey: number,
      rangeKey: string,
      geohash: number,
      version: number,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type ByHashByGeohashQueryVariables = {
  hashKey?: number | null,
  geohash?: ModelIntKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelActivityFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ByHashByGeohashQuery = {
  byHashByGeohash:  {
    __typename: "ModelActivityConnection",
    items:  Array< {
      __typename: "Activity",
      id: string,
      description: string,
      sport: string,
      dateTime: string,
      numberOfAttendants: number,
      address: string,
      createdAt: string | null,
      updatedAt: string | null,
      hashKey: number,
      rangeKey: string,
      geohash: number,
      version: number,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateUpdateParticipationSubscriptionVariables = {
  participationParticipantId: string,
};

export type OnCreateUpdateParticipationSubscription = {
  onCreateUpdateParticipation:  {
    __typename: "Participation",
    id: string,
    activity:  {
      __typename: "Activity",
      id: string,
      description: string,
      sport: string,
      dateTime: string,
      numberOfAttendants: number,
      address: string,
      createdAt: string | null,
      updatedAt: string | null,
      hashKey: number,
      rangeKey: string,
      geohash: number,
      version: number,
    },
    participant:  {
      __typename: "User",
      id: string,
      name: string,
      pictureUrl: string | null,
      bio: string | null,
      email: string | null,
      version: number,
    } | null,
    participationParticipantId: string | null,
    status: ParticipationStatus,
    createdAt: string | null,
    updatedAt: string | null,
    version: number,
  } | null,
};

export type OnUpdateNotificationSubscriptionVariables = {
  notificationUserId: string,
};

export type OnUpdateNotificationSubscription = {
  onUpdateNotification:  {
    __typename: "Notification",
    id: string,
    user:  {
      __typename: "User",
      id: string,
      name: string,
      pictureUrl: string | null,
      bio: string | null,
      email: string | null,
      version: number,
    } | null,
    notificationUserId: string | null,
    text: string,
    read: boolean | null,
    createdAt: string | null,
    updatedAt: string | null,
    version: number,
  } | null,
};

export type OnDeleteNotificationSubscriptionVariables = {
  notificationUserId: string,
};

export type OnDeleteNotificationSubscription = {
  onDeleteNotification:  {
    __typename: "Notification",
    id: string,
    user:  {
      __typename: "User",
      id: string,
      name: string,
      pictureUrl: string | null,
      bio: string | null,
      email: string | null,
      version: number,
    } | null,
    notificationUserId: string | null,
    text: string,
    read: boolean | null,
    createdAt: string | null,
    updatedAt: string | null,
    version: number,
  } | null,
};

export type OnCreateNotificationSubscription = {
  onCreateNotification:  {
    __typename: "Notification",
    id: string,
    user:  {
      __typename: "User",
      id: string,
      name: string,
      pictureUrl: string | null,
      bio: string | null,
      email: string | null,
      version: number,
    } | null,
    notificationUserId: string | null,
    text: string,
    read: boolean | null,
    createdAt: string | null,
    updatedAt: string | null,
    version: number,
  } | null,
};
