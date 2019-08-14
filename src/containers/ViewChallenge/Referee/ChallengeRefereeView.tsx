import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import React, { FunctionComponent } from 'react';

import userIcon from '../../../assets/user.png';
import Label from '../../../components/UI/Label/Label';

const getMessage = (status: string) => {
  let message = null;
  switch (status) {
    case 'PENDING':
      message = 'You were invited to referee this challenge. Accept or reject it!'
      break;
    case 'ACCEPTED':
      message = 'Great news, you already accepted this challenge so now you can select a winner!'
      break;
    case 'REJECTED':
      message = 'Looks like you rejected this challenge, sad :('
      break;
    default:
      break;
  }
  return message;
}

interface ChallengeRefereeViewProps {
  challenge: any
  challengeAccepted(): void
  challengeRejected(): void
  ownerSelectedAsWinner(): void
  opponentSelectedAsWinner(): void
}

const ChallengeRefereeView: FunctionComponent<ChallengeRefereeViewProps> = props => {
  let controls = props.challenge.refereeStatus === 'PENDING' ? (
    <div className="Controls">
      <Button variant="contained" color="primary" onClick={props.challengeAccepted} >Accept</Button>
      <Button variant="contained" color="secondary" onClick={props.challengeRejected} >Reject</Button>
    </div>
  ) : null;
  const message = getMessage(props.challenge.refereeStatus);
  let selectOwnerAsWinnerAction = null;
  let selectOpponentAsWinnerAction = null;
  if (props.challenge.refereeStatus === 'ACCEPTED' && !props.challenge.winner) {
    selectOwnerAsWinnerAction = (<Button type="button" onClick={props.ownerSelectedAsWinner}>Winner</Button>);
    selectOpponentAsWinnerAction = (<Button type="button" onClick={props.opponentSelectedAsWinner}>Winner</Button>);
  }
  if (props.challenge.winner) {
    if (props.challenge.winner.id === props.challenge.owner.id) {
      selectOwnerAsWinnerAction = '(WINNER)';
    } else {
      selectOpponentAsWinnerAction = '(WINNER)';
    }
  }

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
    {selectOwnerAsWinnerAction}
    <Label>Opponent:</Label>
    <Grid container>
      <Avatar alt={props.challenge.referee.name} src={props.challenge.referee.pictureUrl || userIcon} style={{ margin: '0.25rem' }} />
      <p>{props.challenge.referee.name}</p>
    </Grid>
    {selectOpponentAsWinnerAction}
  </div>)
};

export default ChallengeRefereeView;