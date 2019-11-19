import React, { useEffect, FunctionComponent, useState } from "react";
import { connect } from "react-redux";

import { CircularProgress, Typography } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Address from "../../components/Address/Address";
import { FetchAll, SetFilters } from "../../store/actions/activities.actions";
import { State } from "../../store/reducers";

import Item from "./Item/Item";
import moment from "moment";
import { NavLink } from "react-router-dom";

interface ActivitiesProps {
  currentLocation: any;
  filters: any;
  profile: any;
  activities: any[];
  loading: boolean;
  fetchActivities(location: any): void;
  setFilters(filters: any): void;
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      marginBottom: "1rem"
    },
    day: {
      textAlign: "center"
    }
  })
);

const Activities: FunctionComponent<ActivitiesProps> = ({
  filters,
  currentLocation,
  profile,
  activities,
  loading,
  fetchActivities,
  setFilters
}: ActivitiesProps) => {
  const classes = useStyles();
  const [address, setAddress] = useState<any>({ location: filters.location, address: filters.address });

  const activitiesGroupedByDate = groupActivitiesByDate(activities);

  useEffect(() => {
    if (!filters.location && currentLocation) {
      setFilters({ ...filters, ...currentLocation, nearBy: false });
    }
  }, [currentLocation, filters, setFilters]);

  useEffect(() => {
    if (filters.location) {
      fetchActivities(filters);
    }
  }, [filters, fetchActivities]);

  const handleLocationChanged = (location: any) => {
    setAddress(location);
    if (location) {
      setFilters({ ...filters, ...location, nearBy: false });
    }
  };

  if (loading) {
    return <CircularProgress />;
  }
  return (
    <div className={classes.root}>
      <div className={classes.root}>
        <Address value={address} onLocationChanged={handleLocationChanged} />
      </div>

      {filters.location && activities.length === 0 ? (
        <p>
          We didn't find any activity in that area.
          <span>
            <NavLink to="/activities/new">Click here to create one</NavLink>
          </span>
        </p>
      ) : null}

      {Object.keys(activitiesGroupedByDate).map(date => {
        const dateDelimiter = (
          <Typography key={date} variant="body1" color="textPrimary" className={classes.day}>
            <strong>{moment(date).format("dddd, MMMM DD")}</strong>
          </Typography>
        );
        return [
          dateDelimiter,
          ...activitiesGroupedByDate[date].map((activity: any) => (
            <Item key={activity.id} profile={profile} activity={activity} />
          ))
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
  filters: activities.filters,
  profile: auth.profile,
  currentLocation: auth.currentLocation
});

const mapDispatchToProps = (dispatch: any) => ({
  setFilters: (filters: any) => dispatch(SetFilters.create(filters)),
  fetchActivities: (location: any) => dispatch(FetchAll.create(location))
});

export default connect(mapStateToProps, mapDispatchToProps)(Activities);
