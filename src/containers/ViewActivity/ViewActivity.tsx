import React, { useState, useEffect, forwardRef, useRef } from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { NavLink, NavLinkProps } from "react-router-dom";
import formatDate from "date-fns/format";
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
  Link as LinkButton,
  Link,
  Tooltip
} from "@material-ui/core";
import {
  Delete as DeleteIcon,
  Share as ShareIcon,
  Room,
  AccessTime,
  CalendarToday,
  ArrowBackOutlined
} from "@material-ui/icons";
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
  const classes = useStyles();

  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const inputRef = useRef(null);

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
  const handleShareActivity = (e: any) => {
    e.preventDefault();
    if (inputRef && inputRef.current) {
      (inputRef.current as any).select();
    }
    document.execCommand("copy");
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

  const shareButton = document.queryCommandSupported("copy") && (
    <Tooltip title="Share activity">
      <IconButton aria-label="share" onClick={handleShareActivity}>
        <ShareIcon />
        <input ref={inputRef} type="hidden" value={window.location.href} />
      </IconButton>
    </Tooltip>
  );

  if (loading || !activity || activity.id !== activityId) {
    return <CircularProgress />;
  }

  if (activity.deleted) {
    return <Redirect to="/activities" />;
  }

  let actions = null;
  if (isOwner()) {
    actions = (
      <Grid container justify="flex-end" key="delete">
        {shareButton}
        <IconButton aria-label="delete" onClick={() => setDeleteConfirmation(true)}>
          <DeleteIcon />
        </IconButton>
      </Grid>
    );
  } else if (acceptedActivity()) {
    actions = (
      <Grid container justify="space-between" key="share">
        <Button aria-label="reject" variant="outlined" color="secondary" onClick={handleRejectActivity}>
          Won't join
        </Button>
        {shareButton}
      </Grid>
    );
  } else if (rejectedActivity() || !isMaxNumberOfParticipants()) {
    actions = (
      <Grid container justify="space-between" key="share">
        <Button aria-label="accept" variant="outlined" color="primary" onClick={handleJoinActivity}>
          Attend
        </Button>
        {shareButton}
      </Grid>
    );
  } else if (isMaxNumberOfParticipants()) {
    actions = (
      <Grid container justify="space-between" key="share">
        <Typography variant="subtitle1" color="error">
          Too late, there is no spot left on this activity.
        </Typography>
        {shareButton}
      </Grid>
    );
  }

  return (
    <div className={classes.root}>
      <Grid container justify="flex-start" alignItems="center">
        <IconButton
          aria-label="back"
          component={forwardRef((props: NavLinkProps, ref: any) => (
            <NavLink {...props} innerRef={ref} />
          ))}
          to="/activities"
        >
          <ArrowBackOutlined />
        </IconButton>
        <Typography component="p" variant="subtitle1">
          Go back to activities
        </Typography>
      </Grid>

      <Card>
        <CardHeader
          avatar={
            <NavLink to={`/profiles/${activity.owner.id}`}>
              <Avatar
                className={classes.avatar}
                alt={activity.owner.name}
                src={activity.owner.pictureUrl || userIcon}
              />
            </NavLink>
          }
          title={
            <Link
              variant="subtitle1"
              color="textPrimary"
              component={forwardRef((props: NavLinkProps, ref: any) => (
                <NavLink {...props} innerRef={ref} />
              ))}
              to={`/profiles/${activity.owner.id}`}
            >
              <strong>{activity.owner.name}</strong>
            </Link>
          }
          subheader={"Created at " + formatDate(new Date(activity.createdAt), "MMMM dd, yyyy") + " | " + activity.sport}
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
              {formatDate(new Date(activity.dateTime), "EEEE, MMMM dd")}
            </Typography>
          </Grid>
          <Grid container className={classes.iconText}>
            <AccessTime color="disabled" className={classes.icon} />
            <Typography variant="subtitle1" color="textSecondary">
              {formatDate(new Date(activity.dateTime), "hh:mm a")}
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
