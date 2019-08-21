import React, { useEffect, FunctionComponent } from "react";
import { connect } from "react-redux";

import { CircularProgress } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";

import { Fetch, Delete, CleanMessages, Accept, Reject } from "../../store/actions/activities.actions";
import { State } from "../../store/reducers";

import Item from "./Item/Item";

interface ActivitiesProps {
  activities: any[];
  loading: boolean;
  successMessage: string | null;
  errorMessage: string | null;
  profile: any;
  cleanMessages(): void;
  fetchActivities(): void;
  acceptActivity({ userId, activityId }: any): void;
  rejectActivity({ userId, activityId }: any): void;
  deleteActivity(activity: any): void;
}

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: "grid",
      backgroundColor: theme.palette.background.paper
    }
  })
);

const Activities: FunctionComponent<ActivitiesProps> = ({
  activities,
  loading,
  errorMessage,
  successMessage,
  profile,
  fetchActivities,
  acceptActivity,
  rejectActivity,
  deleteActivity,
  cleanMessages
}: ActivitiesProps) => {
  const classes = useStyles();

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  // TODO extract this code in a distinct component
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (successMessage) {
      enqueueSnackbar(successMessage, { variant: "success" });
      cleanMessages();
    }
  }, [successMessage, enqueueSnackbar, cleanMessages]);
  useEffect(() => {
    if (errorMessage) {
      enqueueSnackbar(errorMessage, { variant: "error" });
      cleanMessages();
    }
  }, [errorMessage, enqueueSnackbar, cleanMessages]);

  const handleDeleteActivity = (activity: any) => deleteActivity(activity);

  if (loading) {
    return <CircularProgress />;
  }
  return (
    <div className={classes.root}>
      {activities.map(activity => (
        <Item
          key={activity.id}
          activity={activity}
          isOwner={activity.owner.id === profile.id}
          onAccept={activity => acceptActivity({ userId: profile.id, activityId: activity.id })}
          onReject={activity => rejectActivity({ userId: profile.id, activityId: activity.id })}
          onDelete={handleDeleteActivity}
        />
      ))}
    </div>
  );
};

const mapStateToProps = ({ activities, auth }: State) => ({
  loading: activities.loading,
  activities: activities.activities,
  successMessage: activities.successMessage,
  errorMessage: activities.errorMessage,
  profile: auth.profile
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchActivities: () => dispatch(Fetch.create()),
  acceptActivity: ({ userId, activityId }: any) => dispatch(Accept.create({ userId, activityId })),
  rejectActivity: ({ userId, activityId }: any) => dispatch(Reject.create({ userId, activityId })),
  deleteActivity: (activity: any) => dispatch(Delete.create(activity)),
  cleanMessages: () => dispatch(CleanMessages.create())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Activities);
