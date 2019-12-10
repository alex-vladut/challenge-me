import React, { FunctionComponent, forwardRef } from "react";
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
  Grid,
  Link
} from "@material-ui/core";
import { ArrowForwardOutlined, AccessTime, Room } from "@material-ui/icons";
import { grey } from "@material-ui/core/colors";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import userIcon from "../../../assets/user.png";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(2)
    },
    header: {},
    avatar: {
      backgroundColor: grey[500]
    },
    content: {
      display: "grid",
      gridTemplateColumns: "1fr 3fr",
      gridGap: theme.spacing(1)
    },
    actions: {
      display: "grid",
      gridTemplateColumns: "5fr 1fr",
      marginRight: theme.spacing(1)
    },
    location: {
      display: "grid",
      gridTemplateColumns: "1em auto",
      gridGap: theme.spacing(1),
      padding: theme.spacing(1)
    }
  })
);

interface ItemProps {
  profile: any;
  activity: any;
}

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

const Item: FunctionComponent<ItemProps> = ({ activity, profile }: ItemProps) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <NavLink to={`/profiles/${activity.owner.id}`}>
            <Avatar className={classes.avatar} alt={activity.owner.name} src={activity.owner.pictureUrl || userIcon} />
          </NavLink>
        }
        action={getAttendanceStatus(activity, profile)}
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
        subheader={activity.sport}
        className={classes.header}
      />
      <CardContent className={classes.content}>
        <Grid container alignContent="center" justify="center" alignItems="center">
          <div style={{ fontSize: 20, width: "100%", textAlign: "center" }}>
            {formatDate(new Date(activity.dateTime), "hh:mm a")}
          </div>
          <AccessTime color="disabled" fontSize="large" />
        </Grid>
        <Typography component="p" color="textPrimary">
          {activity.description}
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <div className={classes.location}>
          <Room color="disabled" />
          <Typography noWrap variant="subtitle1" color="textSecondary">
            {activity.address}
          </Typography>
        </div>
        <Grid container justify="flex-end">
          <NavLink to={`/activities/${activity.id}`}>
            <IconButton aria-label="open">
              <ArrowForwardOutlined />
            </IconButton>
          </NavLink>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default Item;
