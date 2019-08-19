import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  IconButton,
  Typography,
} from '@material-ui/core';
import { grey, red } from '@material-ui/core/colors';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Favorite, Share } from '@material-ui/icons';
import moment from 'moment';

import userIcon from '../../assets/user.png';
import { Fetch } from '../../store/actions/activities.actions';
import { State } from '../../store/reducers/activities.reducer';

interface ActivitiesProps {
  activities: any[]
  loading: boolean
  fetchActivities(): void
}

const useStyles = makeStyles(() =>
  createStyles({
    header: {
      backgroundColor: grey[100],
    },
    avatar: {
      backgroundColor: red[500],
    },
  }),
);

const init = (props: ActivitiesProps) => {
  if (!props.loading && !props.activities.length) {
    props.fetchActivities();
  }
}

const Activities = (props: ActivitiesProps) => {
  useEffect(() => init(props), [props]);
  const classes = useStyles();

  if (props.loading) {
    return <CircularProgress />
  }
  return (<Fragment>
    {props.activities.map(activity => (
      <Card key={activity.id}>
        <CardHeader
          avatar={<Avatar alt={activity.owner.name} src={activity.owner.pictureUrl || userIcon} />}
          title={activity.title}
          subheader={moment(activity.dateTime).format('MMMM DD, YYYY')}
          className={classes.header} />
        <CardContent>
          <Typography variant="h6" color="textPrimary">{activity.description}</Typography>
          <Divider light />
          <Typography variant="body2" color="textSecondary">{'Created at: ' + moment(activity.createdAt).format('MMMM DD, YYYY')}</Typography>
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
  </Fragment>)
}

const mapStateToProps = ({ activities: { loading, activities } }: { activities: State }) => ({
  loading,
  activities,
})

const mapDispatchToProps = (dispatch: any) => ({
  fetchActivities: () => dispatch(Fetch.create()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Activities)