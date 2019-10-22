import React, { useEffect, FunctionComponent, useState } from "react";
import { connect } from "react-redux";

import { CircularProgress } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import Address from "../../components/Address/Address";
import { FetchAll } from "../../store/actions/activities.actions";
import { State } from "../../store/reducers";

import Item from "./Item/Item";

const DEFAULT_ADDRESS = {
  location: { lat: 46.7712101, lon: 23.623635299999933 },
  address: "Cluj-Napoca, Romania"
};

interface ActivitiesProps {
  activities: any[];
  loading: boolean;
  fetchActivities(address: any): void;
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "grid",
      backgroundColor: grey[100]
    }
  })
);

const Activities: FunctionComponent<ActivitiesProps> = ({ activities, loading, fetchActivities }: ActivitiesProps) => {
  const classes = useStyles();
  const [address, setAddress] = useState(DEFAULT_ADDRESS);

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
      <Address value={address} onLocationChanged={setAddress} />
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
  fetchActivities: (location: any) => dispatch(FetchAll.create(location))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Activities);
