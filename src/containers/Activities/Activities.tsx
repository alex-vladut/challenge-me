import React, { FunctionComponent, useState, useEffect } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import moment from "moment";

import { Typography, LinearProgress } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";

import Address from "../../components/Address/Address";
import Item from "./Item/Item";

import { SetFilters } from "../../store/actions/activities.actions";
import { State } from "../../store/reducers";

interface ActivitiesProps {
  filters: any;
  profile: any;
  activities: any[];
  loading: boolean;
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
  profile,
  activities,
  loading,
  setFilters
}: ActivitiesProps) => {
  const classes = useStyles();
  const [address, setAddress] = useState<any>({ location: filters.location, address: filters.address });
  const [completed, setCompleted] = React.useState(0);

  const activitiesGroupedByDate = groupActivitiesByDate(activities);

  useEffect(() => {
    function progress() {
      setCompleted(oldCompleted => {
        const diff = Math.random() * 10;
        return Math.min(oldCompleted + diff, 100);
      });
    }

    const timer = setInterval(progress, 300);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleLocationChanged = (location: any) => {
    setAddress(location);
    setCompleted(0);
    if (location) {
      setFilters({ ...filters, ...location, nearBy: false });
    }
  };

  if (loading) {
    return <LinearProgress variant="determinate" value={completed} />;
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
  activities
    .sort((a, b) => moment(a.dateTime).unix() - moment(b.dateTime).unix())
    .reduce((accumulator, activity) => {
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
  profile: auth.profile
});

const mapDispatchToProps = (dispatch: any) => ({
  setFilters: (filters: any) => dispatch(SetFilters.create(filters))
});

export default connect(mapStateToProps, mapDispatchToProps)(Activities);
