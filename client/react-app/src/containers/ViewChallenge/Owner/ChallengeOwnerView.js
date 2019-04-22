import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import React from 'react';

import userIcon from '../../../assets/user.ico';
import Label from '../../../components/UI/Label/Label';

const ChallengeOwnerView = props => {
  return (<div>
    <p>You created this challenge.</p>
    <Label>Title:</Label>
    <p>{props.challenge.title}</p>
    <Label>Your opponent:</Label>
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
}

export default ChallengeOwnerView;