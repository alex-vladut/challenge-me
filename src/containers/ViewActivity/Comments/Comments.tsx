import React, { FunctionComponent, useState } from "react";
import { Avatar, Card, CardContent, CardHeader, Paper, Typography, InputBase, IconButton } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import { Send, AccessTime } from "@material-ui/icons";

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

const timeDifference = (from: moment.Moment, to: moment.Moment) => {
  const difference = moment.duration(to.diff(from));
  const years = Math.floor(difference.asYears());
  const months = Math.floor(difference.asMonths());
  const days = Math.floor(difference.asDays());
  const hours = Math.floor(difference.asHours());
  const minutes = Math.floor(difference.asMinutes());

  if (years > 0) {
    return years === 1 ? "1 year ago" : `${years} years ago`;
  }
  if (months > 0) {
    return months === 1 ? "1 month ago" : `${months} months ago`;
  }
  if (days > 0) {
    return days === 1 ? "1 day ago" : `${days} days ago`;
  }
  if (hours > 0) {
    return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  }
  if (minutes === 0) {
    return "few seconds ago";
  }
  return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
};

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
            avatar={<Avatar className={classes.avatar} alt={comment.user.name} src={comment.user.pictureUrl} />}
            title={<strong>{comment.user.name}</strong>}
            subheader={
              <div className={classes.subheader}>
                <AccessTime className={classes.timeIcon} />
                <Typography component="p" variant="body2">
                  {timeDifference(moment(comment.createdAt), moment())}
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
