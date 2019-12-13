import React, { FunctionComponent } from "react";
import { Typography, Button } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/styles";
import { NavLink } from "react-router-dom";

import homeImage from "../../assets/home.jpeg";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    },
    presentation: {
      display: "inline-block",
      textAlign: "center",
      maxWidth: "45%"
    },
    button: {
      margin: "1rem",
      backgroundColor: "green",
      maxWidth: "15rem",
      color: "white"
    },
    callToAction: {
      textDecoration: "none"
    },
    image: {
      display: "inline-block",
      height: "auto",
      maxWidth: "400px"
    }
  })
);

const Home: FunctionComponent = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.presentation}>
        <Typography variant="h4">Do you want to make new friends, have fun and be active at the same time?</Typography>
        <Typography variant="h6">Join our community for free</Typography>
        <NavLink to="/auth" exact className={classes.callToAction}>
          <Button variant="contained" className={classes.button}>
            Join now
        </Button>
        </NavLink>
      </div>
      <img src={homeImage} alt="beautiful woman stretching" className={classes.image} />

    </div>
  );
};

export default Home;
