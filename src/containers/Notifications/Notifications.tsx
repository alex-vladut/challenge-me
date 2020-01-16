import React, { FunctionComponent } from "react";
import { connect } from "react-redux";

import {
  List,
  ListItem,
  Paper,
  ListItemSecondaryAction,
  IconButton,
  ListItemText,
  Divider,
  Typography,
  Tooltip
} from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";

import { MarkNotificationAsRead, MarkNotificationAsUnread, DeleteNotification } from "../../store/actions/auth.actions";
import { State } from "../../store/reducers";
import {
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
  CheckCircleOutline as CheckCircleOutlineIcon
} from "@material-ui/icons";

const useStyles = makeStyles(() =>
  createStyles({
    item: {}
  })
);

export interface NotificationsProps {
  notifications: any[];
  deleteNotification(notification: any): void;
  markAsRead(notification: any): void;
  markAsUnread(notification: any): void;
}

const Notifications: FunctionComponent<NotificationsProps> = ({
  notifications,
  markAsRead,
  markAsUnread,
  deleteNotification
}) => {
  const classes = useStyles({});

  const handleMarkAsReadOrUnread = (notification: any) => {
    if (notification.read) {
      markAsUnread(notification);
    } else {
      markAsRead(notification);
    }
  };

  const handleDeleteNotification = (notification: any) => {
    deleteNotification(notification);
  };

  return (
    <>
      <Typography variant="h5">Notifications</Typography>

      {notifications.length ? (
        <Paper>
          <List>
            {notifications.map(notification => (
              <div key={notification.id} className={classes.item}>
                <ListItem>
                  <ListItemText primary={notification.text} />
                  <ListItemSecondaryAction>
                    <Tooltip title="Mark as read">
                      <IconButton
                        onClick={() => handleMarkAsReadOrUnread(notification)}
                        size="small"
                        aria-label="mark-as-read-unread"
                      >
                        {notification.read ? <CheckCircleIcon /> : <CheckCircleOutlineIcon />}
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete">
                      <IconButton
                        onClick={() => handleDeleteNotification(notification)}
                        size="small"
                        aria-label="delete-notification"
                      >
                        <CloseIcon />
                      </IconButton>
                    </Tooltip>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
        </Paper>
      ) : (
        <Typography>You don't have any new notifications.</Typography>
      )}
    </>
  );
};

const mapStateToProps = ({ auth }: State) => ({
  notifications: auth.profile.notifications,
  loading: auth.loading
});

const mapDispatchToProps = (dispatch: any) => ({
  markAsRead: (notification: any) => dispatch(MarkNotificationAsRead.create(notification)),
  markAsUnread: (notification: any) => dispatch(MarkNotificationAsUnread.create(notification)),
  deleteNotification: (notification: any) => dispatch(DeleteNotification.create(notification))
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
