import React, { FunctionComponent, forwardRef } from "react";

import { IconButton, Badge } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Notifications as NotificationsIcon } from "@material-ui/icons";
import { NavLinkProps, NavLink } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      marginLeft: theme.spacing(1)
    }
  })
);

export interface NotificationsProps {
  notifications: any[];
}

const Notifications: FunctionComponent<NotificationsProps> = ({ notifications }) => {
  const classes = useStyles();
  const unreadNotifications = notifications.filter(notification => !notification.read);
  return (
    <IconButton
      className={classes.button}
      component={forwardRef((props: NavLinkProps, ref: any) => (
        <NavLink exact {...props} innerRef={ref} />
      ))}
      to="/notifications"
    >
      <Badge
        color="secondary"
        invisible={!unreadNotifications.length}
        badgeContent={unreadNotifications.length}
        max={9}
      >
        <NotificationsIcon />
      </Badge>
    </IconButton>
  );
};

export default Notifications;
