import React, { useEffect, FunctionComponent } from "react";
import { connect } from "react-redux";

import { CircularProgress } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";

import { Fetch, Delete, CleanMessages } from "../../store/actions/activities.actions";
import { State } from "../../store/reducers/activities.reducer";

import Item from "./Item/Item";

interface ActivitiesProps {
  activities: any[];
  loading: boolean;
  successMessage: string | null;
  errorMessage: string | null;
  cleanMessages(): void;
  fetchActivities(): void;
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

const Activities: FunctionComponent<ActivitiesProps> = ({ activities, loading, errorMessage, successMessage, fetchActivities, deleteActivity, cleanMessages }: ActivitiesProps) => {
  useEffect(() => {
    if (!loading && !activities.length) {
      fetchActivities();
    }
  }, [loading, activities, fetchActivities]);
  const classes = useStyles();

  // TODO extract this code in a distinct component
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (successMessage) {
      enqueueSnackbar(successMessage, { variant: "success" });
    }
  }, [enqueueSnackbar, successMessage]);
  useEffect(() => {
    if (errorMessage) {
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  }, [enqueueSnackbar, errorMessage]);
  useEffect(() => () => cleanMessages(), [cleanMessages]);

  const handleDeleteActivity = (activity: any) => deleteActivity(activity);

  if (loading) {
    return <CircularProgress />;
  }
  return (
    <div className={classes.root}>
      {activities.map(activity => (
        <Item key={activity.id} activity={activity} onDelete={handleDeleteActivity} />
      ))}
    </div>
  );
};

const mapStateToProps = ({ activities: { loading, activities, successMessage, errorMessage } }: { activities: State }) => ({
  loading,
  activities,
  successMessage,
  errorMessage
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchActivities: () => dispatch(Fetch.create()),
  deleteActivity: (activity: any) => dispatch(Delete.create(activity)),
  cleanMessages: () => dispatch(CleanMessages.create())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Activities);
