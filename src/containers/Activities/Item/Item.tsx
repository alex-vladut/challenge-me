import React, { FunctionComponent } from "react";

import moment from "moment";

import { Avatar, Card, CardActions, CardContent, CardHeader, IconButton, Typography, Grid } from "@material-ui/core";
import { ArrowForwardOutlined, AccessTime, Room } from "@material-ui/icons";
import { grey } from "@material-ui/core/colors";
import { createStyles, makeStyles } from "@material-ui/core/styles";

import userIcon from "../../../assets/user.png";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() =>
  createStyles({
    card: {
      margin: "0.5rem"
    },
    header: {
      backgroundColor: grey[200]
    },
    avatar: {
      backgroundColor: grey[500]
    }
  })
);

interface ItemProps {
  activity: any;
}

const Item: FunctionComponent<ItemProps> = ({ activity }: ItemProps) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar} alt={activity.owner.name} src={activity.owner.pictureUrl || userIcon} />
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
              <AccessTime color="disabled" fontSize="large"/>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="h6" color="textPrimary">
              {activity.description}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Grid container alignItems="baseline">
          <Grid item xs={10}>
            <Grid container>
              <Room color="disabled" />
              <Typography variant="subtitle1" color="textSecondary">
                {activity.address}
              </Typography>
            </Grid>
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
