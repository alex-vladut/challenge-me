import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import './Challenges.scss';

import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
} from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { red, grey } from '@material-ui/core/colors';
import { Favorite, Share } from '@material-ui/icons';

import moment from 'moment';

import CountDown from '../../components/CountDown/CountDown';
import userIcon from '../../assets/user.png';
import Spinner from '../../components/UI/Spinner/Spinner';
import { FetchChallenges } from '../../store/actions/challenges.actions';

interface ChallengesProps {
  profile: any
  challenges: any[]
  loading: boolean
  error: string
  loadChallenges(): void
}

const createFilter = (props: ChallengesProps, type: string | undefined) => {
  switch (type) {
    case 'opponent':
      return (challenge: any) => challenge.opponent && challenge.opponent.id === props.profile.id;
    case 'referee':
      return (challenge: any) => challenge.referee && challenge.referee.id === props.profile.id;
    case 'owner':
    default:
      return (challenge: any) => challenge.owner.id === props.profile.id;
  }
}

const getSecondsUntilDeadline = (challenge: any) => {
  const deadline = moment(challenge.deadline);
  const durationUntilDeadline = moment.duration(deadline.diff(moment()));
  return durationUntilDeadline.asSeconds();
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      backgroundColor: grey[100],
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }),
);

const Challenges = (props: ChallengesProps) => {
  const classes = useStyles();
  const [type, setType] = useState<'owner' | 'opponent' | 'referee'>('owner');
  // eslint-disable-next-line
  useEffect(() => { props.loadChallenges(); }, []);

  const updateChallengesFilter = (event: any) => {
    setType(event.target.value);
  }

  let spinner = null;
  if (props.loading) {
    spinner = <Spinner />
  }
  let challengesDisplayed = [];
  if (!props.loading && !props.error) {
    challengesDisplayed = props.challenges.filter(createFilter(props, type))
      .map(challenge => ({ ...challenge, seconds: getSecondsUntilDeadline(challenge) }));
  }

  return (
    <div className="Challenges">

      <FormControl>
        <FormLabel>Filter challenges:</FormLabel>
        <RadioGroup
          aria-label="Challenges filter"
          row
          value={type}
          onChange={updateChallengesFilter} >
          <FormControlLabel
            value="owner"
            control={<Radio />}
            label="My challenges" />
          <FormControlLabel
            value="opponent"
            control={<Radio />}
            label="I am then opponent" />
          <FormControlLabel
            value="referee"
            control={<Radio />}
            label="I am the referee" />
        </RadioGroup>
      </FormControl>
      {spinner}
      {challengesDisplayed.map(challenge => (
        <Card key={challenge.id}>
          <CardHeader
            avatar={
              <Avatar alt={challenge.owner.name} src={challenge.owner.pictureUrl || userIcon} />
            }
            title={challenge.title}
            subheader={'Created: ' + moment(challenge.createdAt).format('MMMM DD, YYYY')}
            className={classes.header} />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">{challenge.description}</Typography>
            {
              challenge.seconds >= 0
                ? <CountDown seconds={challenge.seconds} />
                : "Challenge expired"
            }
          </CardContent>
          <CardActions>
            <IconButton aria-label="add to favorites">
              <Favorite />
            </IconButton>
            <IconButton aria-label="share">
              <Share />
            </IconButton>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  challenges: state.challenges.challenges,
  loading: state.challenges.loading,
  error: state.challenges.error,
  profile: state.auth.profile
});

const mapDispatchToProps = (dispatch: any) => ({
  loadChallenges: () => dispatch(FetchChallenges.create())
});

export default connect(mapStateToProps, mapDispatchToProps)(Challenges);