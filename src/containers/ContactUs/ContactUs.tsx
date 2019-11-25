import React, { FunctionComponent, useState } from "react";
import { connect } from "react-redux";

import { TextField, Paper, Typography, Grid, Button, CircularProgress } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import { State } from "../../store/reducers";
import { SendMessage } from "../../store/actions/auth.actions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      padding: theme.spacing(2),
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2)
    },
    textField: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
    }
  })
);

export interface ContactUsProps {
  loading: boolean;
  sendMessage(message: any): void;
}

const ContactUs: FunctionComponent<ContactUsProps> = ({ loading, sendMessage }) => {
  const classes = useStyles();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleNameChange = (e: any) => setName(e.target.value);
  const handleEmailChange = (e: any) => setEmail(e.target.value);
  const handleMessageChange = (event: any) => setMessage(event.target.value);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && message) {
      sendMessage({ name, email, message });
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Paper className={classes.root}>
      <Typography variant="h4">Contact Us</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Your name"
          value={name}
          className={classes.textField}
          onChange={handleNameChange}
          fullWidth
          required
        />
        <TextField
          label="Email"
          value={email}
          className={classes.textField}
          onChange={handleEmailChange}
          type="email"
          fullWidth
          required
        />
        <TextField
          label="Message"
          value={message}
          onChange={handleMessageChange}
          className={classes.textField}
          multiline
          rows="3"
          rowsMax="5"
          fullWidth
          required
        />
        <Grid container alignItems="flex-start" justify="flex-end">
          <Button variant="contained" color="primary" type="submit">
            Send
          </Button>
        </Grid>
      </form>
    </Paper>
  );
};

const mapStateToProps = ({ auth: { loading } }: State) => ({
  loading
});

const mapDispatchToProps = (dispatch: any) => ({
  sendMessage: (message: any) => dispatch(SendMessage.create(message))
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);
