import { Avatar, CircularProgress, colors, Grid, Paper, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { FunctionComponent, useEffect } from "react";
import { connect } from "react-redux";

import { FetchUser } from "../../store/actions/users.actions";
import { State } from "../../store/reducers";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper
  },
  button: { marginTop: theme.spacing(3) },
  input: { marginBottom: theme.spacing(2) },
  avatar: {
    backgroundColor: colors.red[500],
    margin: 10,
    width: 100,
    height: 100
  }
}));

export interface ViewProfileProps {
  match: any;
  loading: boolean;
  user: any;
  setUserId(userId: string): void;
}

const ViewProfile: FunctionComponent<ViewProfileProps> = ({ match, user, loading, setUserId }) => {
  const classes = useStyles();

  const userId = match.params.profileId;

  useEffect(() => {
    if (!user || user.id !== userId) {
      setUserId(userId);
    }
  }, [user, userId, setUserId]);

  if (loading || !user || user.id !== userId) {
    return <CircularProgress />;
  }

  return (
    <Paper className={classes.root}>
      <Grid container justify="center">
        <Avatar className={classes.avatar} alt={user.name} src={user.pictureUrl} />
        <TextField disabled label="Name" value={user.name} className={classes.input} fullWidth />
        <TextField disabled label="Bio" value={user.bio || ""} className={classes.input} multiline fullWidth />
      </Grid>
    </Paper>
  );
};
const mapStateToProps = ({ users }: State) => ({
  user: users.user,
  loading: users.loading
});

const mapDispatchToProps = (dispatch: any) => ({
  setUserId: (userId: string) => dispatch(FetchUser.create(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewProfile);
