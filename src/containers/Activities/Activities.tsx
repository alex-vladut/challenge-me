import React, { useEffect, FunctionComponent } from "react";
import { connect } from "react-redux";

import { CircularProgress } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";

import { FetchAll } from "../../store/actions/activities.actions";
import { State } from "../../store/reducers";

import Item from "./Item/Item";

interface ActivitiesProps {
  activities: any[];
  loading: boolean;
  fetchActivities(): void;
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "grid"
    }
  })
);

const Activities: FunctionComponent<ActivitiesProps> = ({ activities, loading, fetchActivities }: ActivitiesProps) => {
  const classes = useStyles();

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  if (loading) {
    return <CircularProgress />;
  }
  return (
    <div className={classes.root}>
      {activities.map(activity => (
        <Item key={activity.id} activity={activity} />
      ))}
    </div>
  );
};

const mapStateToProps = ({ activities, auth }: State) => ({
  loading: activities.loading,
  activities: activities.activities,
  profile: auth.profile
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchActivities: () => dispatch(FetchAll.create())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Activities);
