import React, { FunctionComponent } from "react";
import { Typography, Button } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/styles";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "inline-block",
      textAlign: "center"
    },
    button: {
      margin: "1rem",
      backgroundColor: "green",
      maxWidth: "15rem",
      color: "white"
    },
    callToAction: {
      textDecoration: "none"
    }
  })
);

const Home: FunctionComponent = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h4">Do you want to make new friends, have fun and be active at the same time?</Typography>
      <Typography variant="h6">Join our community for free</Typography>
      <NavLink to="/auth" exact className={classes.callToAction}>
        <Button variant="contained" className={classes.button}>
          Join now
        </Button>
      </NavLink>
    </div>
  );
};

export default Home;
