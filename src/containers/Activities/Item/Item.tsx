import React, { FunctionComponent } from "react";

import moment from "moment";

import { Avatar, Card, CardActions, CardContent, CardHeader, IconButton, Typography, Grid } from "@material-ui/core";
import { ArrowForwardOutlined, AccessTime, Room } from "@material-ui/icons";
import { grey } from "@material-ui/core/colors";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import userIcon from "../../../assets/user.png";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      margin: "1rem"
    },
    header: {
      backgroundColor: grey[200]
    },
    avatar: {
      backgroundColor: grey[500]
    },
    location: {
      display: "grid",
      gridTemplateColumns: "2em auto",
      gridGap: theme.spacing(1),
      alignItems: "center"
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
  return participation.status === "ACCEPTED" ? "Going" : "Not going";
};

const Item: FunctionComponent<ItemProps> = ({ activity, profile }: ItemProps) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar} alt={activity.owner.name} src={activity.owner.pictureUrl || userIcon} />
        }
        action={
          <Typography variant="subtitle1" color="textSecondary">
            {getAttendanceStatus(activity, profile)}
          </Typography>
        }
        title={activity.owner.name}
        subheader={activity.sport}
        className={classes.header}
      />
      <CardContent>
        <Grid container>
          <Grid item xs={3}>
            <Grid container alignContent="center" justify="center" alignItems="center">
              <div style={{ fontSize: 20, width: "100%", textAlign: "center" }}>
                {moment(activity.dateTime).format("HH:mm A")}
              </div>
              <AccessTime color="disabled" fontSize="large" />
            </Grid>
          </Grid>
          <Grid item xs={9}>
            <Typography component="p" color="textPrimary">
              {activity.description}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Grid container>
          <Grid item xs={10}>
            <div className={classes.location}>
              <Room color="disabled" />
              <Typography noWrap variant="subtitle1" color="textSecondary">
                {activity.address}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={2}>
            <Grid container justify="flex-end">
              <Link to={`/activities/${activity.id}`}>
                <IconButton aria-label="open">
                  <ArrowForwardOutlined />
                </IconButton>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default Item;
