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
import { Redirect } from "react-router";

export interface ViewActivityProps {
  activity: any;
  profile: any;
  sports: any[];
  deleted: boolean;
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

const ViewActivity = ({
  activity,
  sports,
  deleted,
  loading,
  match,
  fetchActivity,
  acceptActivity,
  profile,
  rejectActivity,
  deleteActivity
}: ViewActivityProps) => {
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const classes = useStyles();

  const activityId = match.params.activityId;
  useEffect(() => {
    fetchActivity(activityId);
  }, [activityId, fetchActivity]);

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
  const getSportLabel = () => {
    const sport = sports.find(s => s.name === activity.sport);
    return sport.emoji ? `${sport.emoji} ${sport.name}` : `${sport.name}`;
  };

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

  if (deleted) {
    return <Redirect to="/activities" />;
  }
  if (loading || !activity) {
    return <CircularProgress />;
  }

  const actions = [];
  if (isOwner()) {
    actions.push(
      <Grid container justify="flex-end" key="delete">
        <IconButton aria-label="delete" onClick={() => setDeleteConfirmation(true)}>
          <DeleteIcon />
        </IconButton>
      </Grid>
    );
  } else {
    actions.push(
      <IconButton aria-label="accept" onClick={handleJoinActivity} disabled={acceptedActivity()} key="accept">
        <Check color={acceptedActivity() ? "disabled" : "primary"} />
      </IconButton>,
      <IconButton aria-label="reject" onClick={handleRejectActivity} disabled={rejectedActivity()} key="reject">
        <Clear color={rejectedActivity() ? "disabled" : "error"} />
      </IconButton>
    );
  }
  return (
    <div>
      <Card>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar} alt={activity.owner.name} src={activity.owner.pictureUrl || userIcon} />
          }
          title={activity.owner.name}
          subheader={"Created at " + moment(activity.createdAt).format("MMMM DD, YYYY")}
          className={classes.header}
        />
        <CardContent>
          <Typography variant="h6" color="textPrimary">
            {activity.description}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {getSportLabel()}
          </Typography>
          <Divider light />
          <Typography variant="subtitle1" color="textSecondary">
            {moment(activity.dateTime).format("MMMM DD, YYYY") + " at " + moment(activity.dateTime).format("HH:mm")}
          </Typography>
          <Divider light />
          <Typography variant="subtitle1" color="textSecondary">
            {activity.address}
          </Typography>
          {isMaxNumberOfParticipants() ? (
            <Typography variant="subtitle1" color="secondary">
              The maximum number of participants was met.
            </Typography>
          ) : null}
          {acceptedActivity() ? (
            <Typography variant="subtitle1" color="primary">
              You confirmed will join this activity.
            </Typography>
          ) : null}
          {rejectedActivity() ? (
            <Typography variant="subtitle1" color="error">
              You confirmed won't join this activity.
            </Typography>
          ) : null}
        </CardContent>
        <CardActions>{actions}</CardActions>
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
                {activity.participations
                  .sort((p1: any, p2: any) => p1.status > p2.status)
                  .map((participation: any) => (
                    <ListItem key={participation.id} button>
                      <ListItemAvatar>
                        <Avatar
                          className={classes.avatar}
                          alt={participation.participant.name}
                          src={participation.participant.pictureUrl || userIcon}
                        />
                      </ListItemAvatar>
                      <ListItemText primary={participation.participant.name} />
                      {participation.status === "ACCEPTED" ? (
                        <IconButton aria-label="participant-accepted" disabled={true}>
                          <Check color="primary" />
                        </IconButton>
                      ) : (
                        <IconButton aria-label="participant-reject" disabled={true}>
                          <Clear color="error" />
                        </IconButton>
                      )}
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
    </div>
  );
};

const mapStateToProps = ({ activities, auth }: State) => ({
  activity: activities.activity,
  deleted: activities.deleted,
  loading: activities.loading,
  sports: activities.sports,
  profile: auth.profile
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchActivity: (activityId: string) => dispatch(FetchActivity.create(activityId)),
  acceptActivity: (participation: any) => dispatch(Accept.create(participation)),
  rejectActivity: (participation: any) => dispatch(Reject.create(participation)),
  deleteActivity: (activity: any) => dispatch(Delete.create(activity))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewActivity);
