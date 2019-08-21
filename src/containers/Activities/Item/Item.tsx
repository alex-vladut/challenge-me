import React, { FunctionComponent, useState } from "react";

import moment from "moment";

import { Avatar, Card, CardActions, CardContent, CardHeader, Divider, IconButton, Typography, Dialog, DialogContent, DialogContentText, DialogActions, Button, DialogTitle } from "@material-ui/core";
import { Delete, Check, Clear } from "@material-ui/icons";
import { grey, red } from "@material-ui/core/colors";
import { createStyles, makeStyles } from "@material-ui/core/styles";

import userIcon from "../../../assets/user.png";

const useStyles = makeStyles(() =>
  createStyles({
    card: {
      margin: "0.25rem"
    },
    header: {
      backgroundColor: grey[100]
    },
    avatar: {
      backgroundColor: red[500]
    }
  })
);

interface ItemProps {
  activity: any;
  isOwner: boolean;
  onDelete(item: any): void;
  onAccept(item: any): void;
  onReject(item: any): void;
}

const Item: FunctionComponent<ItemProps> = ({ activity, onAccept, onReject, onDelete }: ItemProps) => {
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const classes = useStyles();

  return (
    <Card className={classes.card}>
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
      </CardContent>
      <CardActions>
        <IconButton aria-label="accept" onClick={() => onAccept(activity)}>
          <Check color="primary" />
        </IconButton>
        <IconButton aria-label="reject" onClick={() => onReject(activity)}>
          <Clear color="error" />
        </IconButton>
        <IconButton aria-label="delete" onClick={() => setDeleteConfirmation(true)}>
          <Delete />
        </IconButton>
      </CardActions>

      <Dialog open={deleteConfirmation} onClose={() => setDeleteConfirmation(false)} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"Delete activity"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Are you sure you want to delete this activity?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmation(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={() => onDelete(activity)} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default Item;
