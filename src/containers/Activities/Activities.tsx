import React, { useEffect, FunctionComponent, useState } from "react";
import { connect } from "react-redux";

import { CircularProgress, Typography } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Address from "../../components/Address/Address";
import { FetchAll } from "../../store/actions/activities.actions";
import { State } from "../../store/reducers";

import Item from "./Item/Item";
import moment from "moment";

interface ActivitiesProps {
  currentLocation: any;
  activities: any[];
  loading: boolean;
  fetchActivities(location: any): void;
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "grid"
    },
    day: {
      margin: "0.5rem"
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

  const activitiesGroupedByDate = groupActivitiesByDate(activities);

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

      {Object.keys(activitiesGroupedByDate).map(date => {
        const dateDelimiter = (
          <Typography key={date} variant="body1" color="textPrimary" className={classes.day}>
            <strong>{moment(date).format("dddd, MMMM DD")}</strong>
          </Typography>
        );
        return [
          dateDelimiter,
          ...activitiesGroupedByDate[date].map((activity: any) => <Item key={activity.id} activity={activity} />)
        ];
      })}
    </div>
  );
};

const groupActivitiesByDate = (activities: any[]) =>
  activities.reduce((accumulator, activity) => {
    const date = moment(activity.dateTime).format("YYYY-MM-DD");
    return {
      ...accumulator,
      [date]: [...(accumulator[date] || []), activity]
    };
  }, {});

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
