import React, { FunctionComponent, useState } from "react";
import { Avatar, Card, CardContent, CardHeader, Paper, Typography, InputBase, IconButton } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import { Send, AccessTime } from "@material-ui/icons";

const useStyles: any = makeStyles(theme =>
  createStyles({
    root: {},
    subheader: {
      display: "flex",
      alignItems: "center"
    },
    timeIcon: {
      width: "1rem",
      height: "1rem",
      fontSize: "1rem",
      marginRight: "6px"
    },
    input: {
      padding: "0.25rem 1rem",
      flexGrow: 1
    },
    cardContent: {
      display: "flex",
      alignItems: "center"
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
  comments: any[];
  onCreateComment(comment: string): void;
}
const Comments: FunctionComponent<CommentsProps> = ({ comments, onCreateComment }) => {
  const classes = useStyles();

  const [comment, setComment] = useState<string>("");

  const handleCommentChange = (e: any) => setComment(e.target.value);
  const handleCreateComment = (e: any) => {
    e.preventDefault();

    onCreateComment(comment);
    setComment("");
  };

  return (
    <div className={classes.root}>
      <Card>
        <CardContent className={classes.cardContent}>
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
            avatar={<Avatar className={classes.avatar} alt={comment.user.name} src={comment.user.pictureUrl} />}
            title={<strong>{comment.user.name}</strong>}
            subheader={
              <div className={classes.subheader}>
                <AccessTime className={classes.timeIcon} />
                <Typography component="p" variant="body2">
                  {moment(comment.createdAt).format("MMMM DD, YYYY HH:mm")}
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
    </div>
  );
};

export default Comments;
