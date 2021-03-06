import React, { FunctionComponent, useState, forwardRef } from "react";
import { NavLink, NavLinkProps } from "react-router-dom";

import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Paper,
  Typography,
  InputBase,
  IconButton,
  Link
} from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Send, AccessTime } from "@material-ui/icons";
import { timeDifference } from "../../../shared/time-difference";

const useStyles: any = makeStyles(theme =>
  createStyles({
    subheader: {
      display: "flex",
      alignItems: "center"
    },
    timeIcon: {
      width: "1rem",
      height: "1rem",
      fontSize: "1rem",
      marginRight: "3px"
    },
    input: {
      padding: "0.5rem 1rem",
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(1),
      flexGrow: 1
    },
    cardContent: {
      display: "flex",
      alignItems: "center",
      marginTop: "0.5rem"
    },
    cardContentBody: {
      paddingTop: "0"
    },
    commentButton: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3)
    }
  })
);

export interface CommentsProps {
  profile: any;
  comments: any[];
  onCreateComment(comment: string): void;
}

const Comments: FunctionComponent<CommentsProps> = ({ profile, comments, onCreateComment }) => {
  const classes = useStyles();

  const [comment, setComment] = useState<string>("");

  const handleCommentChange = (e: any) => setComment(e.target.value);
  const handleCreateComment = (e: any) => {
    e.preventDefault();

    onCreateComment(comment);
    setComment("");
  };

  return (
    <>
      <Card>
        <CardContent className={classes.cardContent}>
          <Avatar alt={profile.name} src={profile.pictureUrl} />
          <Paper elevation={1} className={classes.input}>
            <InputBase
              placeholder="Add a comment..."
              value={comment}
              onChange={handleCommentChange}
              fullWidth
              required
            />
          </Paper>
          <IconButton onClick={handleCreateComment}>
            <Send />
          </IconButton>
        </CardContent>
      </Card>

      {comments.map((comment: any) => (
        <Card key={comment.id} className={classes.commentButton}>
          <CardHeader
            avatar={
              <NavLink to={`/profiles/${comment.user.id}`}>
                <Avatar className={classes.avatar} alt={comment.user.name} src={comment.user.pictureUrl} />
              </NavLink>
            }
            title={
              <Link
                variant="subtitle1"
                color="textPrimary"
                component={forwardRef((props: NavLinkProps, ref: any) => (
                  <NavLink {...props} innerRef={ref} />
                ))}
                to={`/profiles/${comment.user.id}`}
              >
                <strong>{comment.user.name}</strong>
              </Link>
            }
            subheader={
              <div className={classes.subheader}>
                <AccessTime className={classes.timeIcon} />
                <Typography component="p" variant="body2">
                  {timeDifference(new Date(comment.createdAt), new Date())}
                </Typography>
              </div>
            }
          />
          <CardContent className={classes.cardContentBody}>
            <Typography component="p" variant="body1">
              {comment.text}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default Comments;
