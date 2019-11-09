import React, { FunctionComponent, useState } from "react";
import { connect } from "react-redux";

import { Avatar, Button, CircularProgress, Grid, TextField, colors, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import userIcon from "../../assets/user.png";
import { State } from "../../store/reducers";
import { Save } from "../../store/actions/auth.actions";

interface ProfileProps {
  loading: boolean;
  profile: any;
  save(profile: any): void;
}

const useStyles = makeStyles(theme => ({
  root: {
    padding: "1rem",
    backgroundColor: theme.palette.background.paper
  },
  button: { marginTop: theme.spacing(3) },
  avatar: {
    backgroundColor: colors.red[500],
    margin: 10,
    width: 100,
    height: 100
  }
}));

const validate = (profile: any) => {
  const errors: any = {};
  if (!profile.name || profile.name.length <= 3 || profile.name.length > 20) {
    errors.name = "Please provide a name of minimum 3 and maximum 20 characters.";
  }
  if (!profile.email) {
    errors.email = "Please provide a valid email address.";
  }
  return errors;
};

const Profile: FunctionComponent<ProfileProps> = ({ profile, loading, save }: ProfileProps) => {
  const classes = useStyles();

  const [name, setName] = useState<string>(profile.name);
  const [email, setEmail] = useState<string>(profile.email);
  const [errors, setErrors] = useState<any>({});

  const submit = (event: any) => {
    event.preventDefault();
    const updatedProfile = { ...profile, name, email };
    const errors = validate(updatedProfile);
    setErrors(errors);

    if (Object.values(errors).length === 0) {
      save(updatedProfile);
    }
  };
  const handleNameChange = (event: any) => setName(event.target.value);
  const handleEmailChange = (event: any) => setEmail(event.target.value);

  if (loading) {
    return <CircularProgress />;
  }
  return (
    <form onSubmit={submit}>
      <Paper className={classes.root}>
        <Grid container justify="center">
          <Avatar className={classes.avatar} alt={profile.name} src={profile.pictureUrl || userIcon} />
          <TextField
            label="Name"
            value={name}
            onChange={handleNameChange}
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
            required
          />
          <TextField
            label="Email"
            value={email}
            onChange={handleEmailChange}
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
            required
          />
        </Grid>
        <Grid container alignItems="flex-start" justify="flex-end">
          <Button variant="contained" color="primary" className={classes.button} type="submit">
            Save
          </Button>
        </Grid>
      </Paper>
    </form>
  );
};

const mapStateToProps = ({ auth }: State) => ({
  profile: auth.profile,
  loading: auth.loading
});

const mapDispatchToProps = (dispatch: any) => ({
  save: (profile: any) => dispatch(Save.create(profile))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
