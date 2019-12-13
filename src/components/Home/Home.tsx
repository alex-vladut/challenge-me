import React, { forwardRef, FunctionComponent } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

import { Button, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { EmojiEvents } from '@material-ui/icons';

import homeImage from '../../assets/home.jpeg';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexFlow: "wrap"
    },
    presentation: {
      display: "inline-block",
      textAlign: "center",
      margin: "0.5rem",
      maxWidth: "60%",

    },
    button: {
      marginTop: "2rem",
      padding: "1rem 2rem",
      backgroundColor: "#4dc78a",
      color: "#fff",
      '&:hover': {
        background: "#379164",
      },
    },
    title: {
      marginBottom: "1rem",
      color: "#20593d"
    },
    image: {
      display: "inline-block",
      height: "auto",
      maxWidth: "100%",
      maskImage: "linear-gradient(#000, #fff, transparent)",
    },
    imageContainer: {
      margin: "1rem"
    }
  })
);

const Home: FunctionComponent = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.presentation}>
        <Typography variant="h3" className={classes.title}>FIND ACTIVITIES NEAR YOU</Typography>
        <Typography><strong>SportPal</strong> is the easiest way to find activities and people nearby.<br /> Join our community for free and let's stay in shape together.</Typography>
        <Button
          component={forwardRef((props: NavLinkProps, ref: any) => (
            <NavLink exact {...props} innerRef={ref} />
          ))}
          to="/auth"
          variant="contained"
          className={classes.button}
          startIcon={<EmojiEvents />}>
          <Typography>JOIN NOW</Typography>
        </Button>
      </div>
      <div className={classes.imageContainer}>
        <img src={homeImage} alt="beautiful woman stretching" className={classes.image} />
      </div>


    </div>
  );
};

export default Home;
