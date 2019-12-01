import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";

import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  DialogTitle,
  CircularProgress,
  Grid,
  Divider,
  Link as LinkButton
} from "@material-ui/core";
import { Delete as DeleteIcon, Room, AccessTime, CalendarToday, ArrowBackOutlined } from "@material-ui/icons";
import { grey } from "@material-ui/core/colors";
import { createStyles, makeStyles } from "@material-ui/core/styles";

import userIcon from "../../assets/user.png";
import { State } from "../../store/reducers";
import {
  SetActivityId,
  Accept,
  Reject,
  Delete,
  CreateComment,
  FetchMoreComments
} from "../../store/actions/activities.actions";

import Participants from "./Participants/Participants";
import Comments from "./Comments/Comments";

const useStyles: any = makeStyles(theme =>
  createStyles({
    root: {
      paddingBottom: "3rem"
    },
    header: {},
    avatar: {
      backgroundColor: grey[500]
    },
    comment: {
      padding: theme.spacing(2)
    },
    commentButton: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2)
    },
    description: {
      marginBottom: theme.spacing(3)
    },
    divider: {
      marginBottom: theme.spacing(3)
    },
    title: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2)
    },
    iconText: {
      marginBottom: theme.spacing(1)
    },
    icon: {
      marginRight: theme.spacing(0.5)
    }
  })
);

export interface ViewActivityProps {
  activity: any;
  profile: any;
  sports: any[];
  deleted: boolean;
  loading: boolean;
  match: any;
  hasMoreComments: boolean;
  setActivityId(activityId: string): void;
  acceptActivity({ userId, activityId }: any): void;
  rejectActivity(participation: any): void;
  deleteActivity(activity: string): void;
  createComment(comment: any): void;
  fetchMoreComments(): void;
}

const ViewActivity = ({
  activity,
  deleted,
  loading,
  match,
  setActivityId,
  acceptActivity,
  profile,
  hasMoreComments,
  rejectActivity,
  deleteActivity,
  createComment,
  fetchMoreComments
}: ViewActivityProps) => {
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const classes = useStyles();

  const activityId = match.params.activityId;
  useEffect(() => {
    if (!activity || activity.id !== activityId) {
      setActivityId(activityId);
    }
  }, [activity, activityId, setActivityId]);

  const acceptedActivity = () => {
    const participation = activity.participations.find((item: any) => item.participant.id === profile.id);
    return participation && participation.status === "ACCEPTED";
  };
  const rejectedActivity = () => {
    const participation = activity.participations.find((item: any) => item.participant.id === profile.id);
    return participation && participation.status === "REJECTED";
  };

  const isOwner = () => activity.owner.id === profile.id;
  const isMaxNumberOfParticipants = () =>
    activity.numberOfAttendants === activity.participations.filter(({ status }: any) => status === "ACCEPTED").length;

  const handleJoinActivity = () => {
    const participation = activity.participations.find((item: any) => item.participant.id === profile.id) || {
      activityId: activity.id,
      userId: profile.id
    };
    acceptActivity(participation);
  };
  const handleRejectActivity = () => {
    const participation = activity.participations.find((item: any) => item.participant.id === profile.id) || {
      activityId: activity.id,
      userId: profile.id
    };
    rejectActivity(participation);
  };
  const handleDeleteActivity = () => deleteActivity(activity);
  const handleCreateComment = (text: string) => createComment({ text, commentActivityId: activity.id });
  const handleLoadMoreComments = (e: any) => {
    e.preventDefault();

    fetchMoreComments();
  };

  const getAttendanceStatus = (activity: any, profile: any) => {
    const participation = profile.activities.find((p: any) => p.activity.id === activity.id);
    if (!participation) {
      return null;
    }
    return participation.status === "ACCEPTED" ? (
      <Typography variant="subtitle1" color="primary">
        Going
      </Typography>
    ) : (
      <Typography variant="subtitle1" color="error">
        Not going
      </Typography>
    );
  };

  if (deleted) {
    return <Redirect to="/activities" />;
  }
  if (loading || !activity) {
    return <CircularProgress />;
  }

  let actions = null;
  if (isOwner()) {
    actions = (
      <Grid container justify="flex-end" key="delete">
        <IconButton aria-label="delete" onClick={() => setDeleteConfirmation(true)}>
          <DeleteIcon />
        </IconButton>
      </Grid>
    );
  } else if (acceptedActivity()) {
    actions = (
      <Button aria-label="reject" variant="outlined" color="secondary" onClick={handleRejectActivity}>
        Won't join
      </Button>
    );
  } else if (rejectedActivity() || !isMaxNumberOfParticipants()) {
    actions = (
      <Button aria-label="accept" variant="outlined" color="primary" onClick={handleJoinActivity}>
        Attend
      </Button>
    );
  } else if (isMaxNumberOfParticipants()) {
    actions = (
      <Typography variant="subtitle1" color="error">
        Too late, there is no spot left on this activity.
      </Typography>
    );
  }

  return (
    <div className={classes.root}>
      <Grid container justify="flex-start" alignItems="center">
        <Link to="/activities">
          <IconButton aria-label="back">
            <ArrowBackOutlined />
          </IconButton>
        </Link>
        <Typography component="p" variant="subtitle1">
          Go back to activities
        </Typography>
      </Grid>

      <Card>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar} alt={activity.owner.name} src={activity.owner.pictureUrl || userIcon} />
          }
          title={<strong>{activity.owner.name}</strong>}
          subheader={"Created at " + moment(activity.createdAt).format("MMMM DD, YYYY") + " | " + activity.sport}
          action={getAttendanceStatus(activity, profile)}
          className={classes.header}
        />
        <CardContent>
          <Typography component="p" variant="body1" className={classes.description}>
            <i>{activity.description}</i>
          </Typography>

          <Divider className={classes.divider} />

          <Grid container className={classes.iconText}>
            <CalendarToday color="disabled" className={classes.icon} />
            <Typography variant="subtitle1" color="textSecondary">
              {moment(activity.dateTime).format("dddd, MMMM DD")}
            </Typography>
          </Grid>
          <Grid container className={classes.iconText}>
            <AccessTime color="disabled" className={classes.icon} />
            <Typography variant="subtitle1" color="textSecondary">
              {moment(activity.dateTime).format("HH:mm A")}
            </Typography>
          </Grid>
          <Grid container className={classes.iconText}>
            <Room color="disabled" className={classes.icon} />
            <Typography variant="subtitle1" color="textSecondary">
              {activity.address}
            </Typography>
          </Grid>
        </CardContent>
        <CardActions>{actions}</CardActions>
      </Card>

      <Typography variant="body1" color="textPrimary" className={classes.title}>
        <strong>Participants</strong>
      </Typography>
      <Participants participations={activity.participations} />
      <Typography variant="body1" color="textPrimary" className={classes.title}>
        <strong>Comments</strong>
      </Typography>
      <Comments profile={profile} comments={activity.comments} onCreateComment={handleCreateComment} />
      {hasMoreComments ? (
        <LinkButton component="button" variant="body2" onClick={handleLoadMoreComments}>
          Load more...
        </LinkButton>
      ) : null}

      <Dialog open={deleteConfirmation} onClose={() => setDeleteConfirmation(false)}>
        <DialogTitle>{"Delete activity"}</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this activity?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmation(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDeleteActivity} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = ({ activities, auth }: State) => ({
  activity: activities.activity,
  deleted: activities.deleted,
  loading: activities.loading,
  sports: activities.sports,
  hasMoreComments: !!activities.commentsNextToken,
  profile: auth.profile
});

const mapDispatchToProps = (dispatch: any) => ({
  setActivityId: (activityId: string) => dispatch(SetActivityId.create(activityId)),
  acceptActivity: (participation: any) => dispatch(Accept.create(participation)),
  rejectActivity: (participation: any) => dispatch(Reject.create(participation)),
  deleteActivity: (activity: any) => dispatch(Delete.create(activity)),
  createComment: (comment: any) => dispatch(CreateComment.create(comment)),
  fetchMoreComments: () => dispatch(FetchMoreComments.create())
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewActivity);
