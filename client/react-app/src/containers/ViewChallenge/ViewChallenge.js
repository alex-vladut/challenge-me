import './ViewChallenge.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../components/UI/Button/Button';
import Label from '../../components/UI/Label/Label';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/actions';

class ViewChallenge extends Component {

  componentDidMount() {
    this.props.fetchChallenge(this.props.match.params.challengeId);
  }

  acceptChallenge = () => {
    this.props.acceptChallenge(this.props.challenge, this.props.profile);
  }

  rejectChallenge = async () => {
    this.props.rejectChallenge(this.props.challenge, this.props.profile);
  }

  isOwner = (challenge, profile) => challenge.owner.id === profile.id;

  isOpponent = (challenge, profile) => challenge.opponent.id === profile.id;

  isReferee = (challenge, profile) => challenge.referee.id === profile.id;

  isChallengeWaitingAccept = (challenge, profile) =>
    (this.isOpponent(challenge, profile) && challenge.opponentStatus === 'PENDING') || (this.isReferee(challenge, profile) && challenge.refereeStatus === 'PENDING');

  setOwnerAsWinner = () => this.props.setChallengeWinner(this.props.challenge, this.props.challenge.owner);

  setOpponentAsWinner = () => this.props.setChallengeWinner(this.props.challenge, this.props.challenge.opponent);

  render() {
    let controls = undefined;
    if (!this.props.challenge) {
      controls = <Spinner />;
    } else if (this.props.accepting || this.props.rejecting) {
      controls = (<div>Your request is being processed</div>);
    } else if (this.isChallengeWaitingAccept(this.props.challenge, this.props.profile)) {
      controls = (
        <div className="Controls">
          <Button type="confirm" onClick={this.acceptChallenge} >Accept</Button>
          <Button type="danger" onClick={this.rejectChallenge} >Reject</Button>
        </div>
      )
    } else if (this.isOpponent(this.props.challenge, this.props.profile)
      && this.props.challenge.opponentStatus === 'ACCEPTED'
      && !this.props.challenge.winner) {
      controls = <div>Nice, you accepted this challenge :)</div>
    } else if (this.isOpponent(this.props.challenge, this.props.profile)
      && this.props.challenge.opponentStatus === 'REJECTED') {
      controls = <div>You rejected this challenge :(</div>
    } else if (this.isReferee(this.props.challenge, this.props.profile)
      && this.props.challenge.refereeStatus === 'ACCEPTED'
      && !this.props.challenge.winner) {
      controls = <div>You accepted the challenge, now you can choose the winner!</div>
    } else if (this.isReferee(this.props.challenge, this.props.profile) && this.props.challenge.refereeStatus === 'REJECTED') {
      controls = <div>Looks like you rejected the challenge :(</div>
    } else if(this.props.challenge.winner){
      controls = <div>This challenge was completed!</div>;
    }
    let owner = null;
    if (this.props.challenge) {
      if (this.isOwner(this.props.challenge, this.props.profile)) {
        owner = 'You created this challenge';
      } else {
        owner = this.props.challenge.owner.name;
      }
    }
    let selectOwnerAsWinnerAction = null;
    let selectOpponentAsWinnerAction = null;
    if (this.props.challenge) {
      if (this.isReferee(this.props.challenge, this.props.profile)
        && this.props.challenge.refereeStatus === 'ACCEPTED'
        && !this.props.challenge.winner) {
        selectOwnerAsWinnerAction = (<Button type="confirm" onClick={this.setOwnerAsWinner} >Winner</Button>);
        selectOpponentAsWinnerAction = (<Button type="confirm" onClick={this.setOpponentAsWinner} >Winner</Button>);
      }
      if (this.props.challenge.winner) {
        if (this.props.challenge.winner.id === this.props.challenge.owner.id) {
          selectOwnerAsWinnerAction = '(WINNER)';
        } else {
          selectOpponentAsWinnerAction = '(WINNER)';
        }
      }
    }

    return (
      <div className="ViewChallenge">
        {controls}

        {this.props.challenge && (<div className="ChallengeElements">
          <div className="ChallengeElement">
            <Label>Title:</Label>
            <p>{this.props.challenge.title}</p>
          </div>
          <div className="ChallengeElement">
            <Label>Owner:</Label>
            <p>{owner}</p>
            {selectOwnerAsWinnerAction}
          </div>
          <div className="ChallengeElement">
            <Label>Opponent:</Label>
            <p>{this.props.challenge.opponent.name}</p>
            {selectOpponentAsWinnerAction}
          </div>
          <div className="ChallengeElement">
            <Label>Referee:</Label>
            <p>{this.props.challenge.referee.name}</p>
          </div>
        </div>)
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  accepting: state.accepting,
  rejecting: state.rejecting,
  profile: state.profile,
  challenge: state.challenge,
});

const mapDispatchToProps = dispatch => ({
  fetchChallenge: challengeId => dispatch(actions.fetchChallenge(challengeId)),
  acceptChallenge: (challenge, profile) => dispatch(actions.acceptChallenge(challenge, profile)),
  rejectChallenge: (challenge, profile) => dispatch(actions.rejectChallenge(challenge, profile)),
  setChallengeWinner: (challenge, winner) => dispatch(actions.setChallengeWinner(challenge, winner))
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewChallenge);