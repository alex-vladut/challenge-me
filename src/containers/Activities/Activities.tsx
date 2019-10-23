import React, { useEffect, FunctionComponent, useState } from "react";
import { connect } from "react-redux";

import { CircularProgress } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { colors } from "@material-ui/core";
import Address from "../../components/Address/Address";
import { FetchAll } from "../../store/actions/activities.actions";
import { State } from "../../store/reducers";

import Item from "./Item/Item";

interface ActivitiesProps {
  currentLocation: any;
  activities: any[];
  loading: boolean;
  fetchActivities(location: any): void;
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "grid",
      backgroundColor: colors.grey[100]
    }
  })
);

const Activities: FunctionComponent<ActivitiesProps> = ({
  currentLocation,
  activities,
  loading,
  fetchActivities
}: ActivitiesProps) => {
  const classes = useStyles();
  const [address, setAddress] = useState<any>(currentLocation);

  useEffect(() => {
    if (address) {
      fetchActivities(address.location);
    }
  }, [address, fetchActivities]);

  if (loading) {
    return <CircularProgress />;
  }
  return (
    <div className={classes.root}>
      <div className={classes.root}>
        <Address value={address} onLocationChanged={setAddress} />
      </div>
      {activities.map(activity => (
        <Item key={activity.id} activity={activity} />
      ))}
    </div>
  );
};

const mapStateToProps = ({ activities, auth }: State) => ({
  loading: activities.loading,
  activities: activities.activities,
  profile: auth.profile,
  currentLocation: auth.currentLocation
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchActivities: (location: any) => dispatch(FetchAll.create(location))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Activities);
