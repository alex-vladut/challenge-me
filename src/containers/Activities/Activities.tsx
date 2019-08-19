import React, { Fragment, useEffect, FunctionComponent } from "react";
import { connect } from "react-redux";

import { Avatar, Card, CardActions, CardContent, CardHeader, CircularProgress, Divider, IconButton, Typography } from "@material-ui/core";
import { grey, red } from "@material-ui/core/colors";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Favorite, Share } from "@material-ui/icons";
import moment from "moment";

import userIcon from "../../assets/user.png";
import { Fetch } from "../../store/actions/activities.actions";
import { State } from "../../store/reducers/activities.reducer";

interface ActivitiesProps {
  activities: any[];
  loading: boolean;
  error: string;
  fetchActivities(): void;
}

const useStyles = makeStyles(() =>
  createStyles({
    header: {
      backgroundColor: grey[100]
    },
    avatar: {
      backgroundColor: red[500]
    }
  })
);

const init = (props: ActivitiesProps) => {
  if (!props.loading && !props.activities.length) {
    props.fetchActivities();
  }
};

const Activities: FunctionComponent<ActivitiesProps> = (props: ActivitiesProps) => {
  useEffect(() => init(props), [props]);
  const classes = useStyles();

  if (props.loading) {
    return <CircularProgress />;
  }
  return (
    <Fragment>
      {props.activities.map(activity => (
        <Card key={activity.id}>
          <CardHeader
            avatar={<Avatar className={classes.avatar} alt={activity.owner.name} src={activity.owner.pictureUrl || userIcon} />}
            title={activity.title}
            subheader={"Created at: " + moment(activity.createdAt).format("MMMM DD, YYYY")}
            className={classes.header}
          />
          <CardContent>
            <Typography variant="h6" color="textPrimary">
              {activity.description}
            </Typography>
            <Divider light />
            <Typography variant="subtitle1" color="textSecondary">
              {moment(activity.dateTime).format("MMMM DD, YYYY") + " at " + moment(activity.dateTime).format("HH:mm")}
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton aria-label="add to favorites">
              <Favorite />
            </IconButton>
            <IconButton aria-label="share">
              <Share />
            </IconButton>
          </CardActions>
        </Card>
      ))}
    </Fragment>
  );
};

const mapStateToProps = ({ activities: { loading, activities } }: { activities: State }) => ({
  loading,
  activities
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchActivities: () => dispatch(Fetch.create())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Activities);
