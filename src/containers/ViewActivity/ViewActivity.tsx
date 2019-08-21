import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import moment from "moment";

import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
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
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from "@material-ui/core";
import { Delete as DeleteIcon, Check, Clear, ExpandMore } from "@material-ui/icons";
import { grey, red } from "@material-ui/core/colors";
import { createStyles, makeStyles } from "@material-ui/core/styles";

import userIcon from "../../assets/user.png";
import { State } from "../../store/reducers";
import { FetchActivity, Accept, Reject, Delete } from "../../store/actions/activities.actions";

export interface ViewActivityProps {
  activity: any;
  profile: any;
  loading: boolean;
  match: any;
  fetchActivity(activityId: string): void;
  acceptActivity({ userId, activityId }: any): void;
  rejectActivity(participation: any): void;
  deleteActivity(activity: string): void;
}

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.paper
    },
    header: {
      backgroundColor: grey[100]
    },
    avatar: {
      backgroundColor: red[500]
    }
  })
);

const ViewActivity = ({ activity, loading, match, fetchActivity, acceptActivity, profile, rejectActivity, deleteActivity }: ViewActivityProps) => {
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [rejectConfirmation, setRejectConfirmation] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const classes = useStyles();

  const activityId = match.params.activityId;
  useEffect(() => {
    fetchActivity(activityId);
  }, [activityId, fetchActivity]);

  const joinedActivity = () => activity.participations.find((item: any) => item.participant.id === profile.id);
  const isOwner = () => activity.owner.id === profile.id;
  const isMaxNumberOfParticipants = () => activity.numberOfAttendants === activity.participations.length;

  const handleJoinActivity = () => acceptActivity({ activityId: activity.id, userId: profile.id });
  const handleRejectActivity = () => {
    const participation = activity.participations.find((item: any) => item.participant.id === profile.id);
    if (participation) {
      rejectActivity(participation);
    }
    setRejectConfirmation(false);
  };
  const handleDeleteActivity = () => deleteActivity(activity.id);

  if (loading || !activity) {
    return <CircularProgress />;
  }
  return (
    <div>
      <Card>
        <CardHeader
          avatar={<Avatar className={classes.avatar} alt={activity.owner.name} src={activity.owner.pictureUrl || userIcon} />}
          title={activity.title}
          subheader={"Created at " + moment(activity.createdAt).format("MMMM DD, YYYY")}
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
          {isMaxNumberOfParticipants() ? (
            <Typography variant="subtitle1" color="secondary">
              The maximum number of participants was met.
            </Typography>
          ) : null}
          {joinedActivity() ? (
            <Typography variant="subtitle1" color="primary">
              You confirmed will join this activity.
            </Typography>
          ) : null}
        </CardContent>
        <CardActions>
          {!isOwner() && !joinedActivity() && !isMaxNumberOfParticipants() ? (
            <IconButton aria-label="accept" onClick={handleJoinActivity}>
              <Check color="primary" />
            </IconButton>
          ) : null}

          {!isOwner() && joinedActivity() ? (
            <IconButton aria-label="reject" onClick={() => setRejectConfirmation(true)}>
              <Clear color="error" />
            </IconButton>
          ) : null}

          {isOwner() ? (
            <Grid container justify="flex-end">
              <IconButton aria-label="delete" onClick={() => setDeleteConfirmation(true)}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          ) : null}
        </CardActions>
      </Card>

      {isOwner() ? (
        <ExpansionPanel expanded={expanded} onChange={() => setExpanded(!expanded)}>
          <ExpansionPanelSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6" color="textPrimary">
              Participants
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            {activity.participations.length === 0 ? (
              <Typography variant="subtitle1" color="textSecondary">
                So far no user confirmed they will join your activity.
              </Typography>
            ) : null}
            {activity.participations.length > 0 ? (
              <List dense className={classes.root}>
                {activity.participations.map((participation: any) => (
                  <ListItem key={participation.id} button>
                    <ListItemAvatar>
                      <Avatar className={classes.avatar} alt={participation.participant.name} src={participation.participant.pictureUrl || userIcon} />
                    </ListItemAvatar>
                    <ListItemText primary={participation.participant.name} />
                  </ListItem>
                ))}
              </List>
            ) : null}
          </ExpansionPanelDetails>
        </ExpansionPanel>
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

      <Dialog open={rejectConfirmation} onClose={() => setRejectConfirmation(false)}>
        <DialogTitle>{"Won't join this activity!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">It seems you have changed your mind. Do you want to inform the owner that you won't join this activity anymore?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRejectConfirmation(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleRejectActivity} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = ({ activities, auth }: State) => ({
  activity: activities.activity,
  loading: activities.loading,
  profile: auth.profile
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchActivity: (activityId: string) => dispatch(FetchActivity.create(activityId)),
  acceptActivity: ({ userId, activityId }: any) => dispatch(Accept.create({ userId, activityId })),
  rejectActivity: (participation: any) => dispatch(Reject.create(participation)),
  deleteActivity: (activity: any) => dispatch(Delete.create(activity))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewActivity);
