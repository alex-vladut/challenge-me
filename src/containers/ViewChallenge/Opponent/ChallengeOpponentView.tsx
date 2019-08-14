import React, { FunctionComponent } from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import userIcon from '../../../assets/user.png';
import Label from '../../../components/UI/Label/Label';

const getMessage = (status: string) => {
  let message = null;
  switch (status) {
    case 'PENDING':
      message = 'You were invited to this challenge. Accept or reject it!'
      break;
    case 'ACCEPTED':
      message = 'Great news, you already accepted this challenge!'
      break;
    case 'REJECTED':
      message = 'Looks like you rejected this challenge, sad :('
      break;
    default:
      break;
  }
  return message;
}

interface ChallengeOpponentViewProps {
  challenge: any
  challengeAccepted(): void
  challengeRejected(): void
}

const ChallengeOpponentView: FunctionComponent<ChallengeOpponentViewProps> = props => {
  let controls = props.challenge.opponentStatus === 'PENDING' ? (
    <div className="Controls">
      <Button variant="contained" color="primary" onClick={props.challengeAccepted} >Accept</Button>
      <Button variant="contained" color="secondary" onClick={props.challengeRejected} >Reject</Button>
    </div>
  ) : null;
  const message = getMessage(props.challenge.opponentStatus);
  return (<div>
    <p>{message}</p>
    {controls}
    <Label>Title:</Label>
    <p>{props.challenge.title}</p>
    <Label>Created by:</Label>
    <Grid container >
      <Avatar alt={props.challenge.opponent.name} src={props.challenge.opponent.pictureUrl || userIcon} style={{ margin: '0.25rem' }} />
      <p>{props.challenge.opponent.name}</p>
    </Grid>
    <Label>Referee:</Label>
    <Grid container>
      <Avatar alt={props.challenge.referee.name} src={props.challenge.referee.pictureUrl || userIcon} style={{ margin: '0.25rem' }} />
      <p>{props.challenge.referee.name}</p>
    </Grid>
  </div>)
};

export default ChallengeOpponentView;