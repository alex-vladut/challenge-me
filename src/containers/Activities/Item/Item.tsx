import React, { FunctionComponent } from "react";

import moment from "moment";

import { Avatar, Card, CardActions, CardContent, CardHeader, Divider, IconButton, Typography } from "@material-ui/core";
import { ArrowForwardOutlined } from "@material-ui/icons";
import { grey, red } from "@material-ui/core/colors";
import { createStyles, makeStyles } from "@material-ui/core/styles";

import userIcon from "../../../assets/user.png";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() =>
  createStyles({
    card: {
      margin: "0.5rem"
    },
    header: {
      backgroundColor: grey[100]
    },
    avatar: {
      backgroundColor: red[500]
    },
    actions: {
      display: "grid",
      justifyContent: "end"
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
        avatar={<Avatar className={classes.avatar} alt={activity.owner.name} src={activity.owner.pictureUrl || userIcon} />}
        title={activity.owner.name}
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
      </CardContent>
      <CardActions className={classes.actions}>
        <Link to={"/activities/" + activity.id}>
          <IconButton aria-label="open">
            <ArrowForwardOutlined />
          </IconButton>
        </Link>
      </CardActions>
    </Card>
  );
};

export default Item;
