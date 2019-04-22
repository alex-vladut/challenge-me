import './ViewChallenge.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/actions';
import ChallengeOwnerView from './Owner/ChallengeOwnerView';
import ChallengeOpponentView from './Opponent/ChallengeOpponentView';
import ChallengeRefereeView from './Referee/ChallengeRefereeView';

class ViewChallenge extends Component {

  componentDidMount() {
    this.props.fetchChallenge(this.props.match.params.challengeId);
  }

  acceptChallenge = () => {
    this.props.acceptChallenge(this.props.challenge);
  }

  rejectChallenge = async () => {
    this.props.rejectChallenge(this.props.challenge, this.props.profile);
  }

  isOwner = (challenge, profile) => challenge.owner.id === profile.id;

  isOpponent = (challenge, profile) => challenge.opponent.id === profile.id;

  isReferee = (challenge, profile) => challenge.referee.id === profile.id;

  isChallengeWaitingAccept = (challenge, profile) => (this.isOpponent(challenge, profile) && challenge.opponentStatus === 'PENDING') || (this.isReferee(challenge, profile) && challenge.refereeStatus === 'PENDING');

  setOwnerAsWinner = () => this.props.setChallengeWinner(this.props.challenge, this.props.challenge.owner);

  setOpponentAsWinner = () => this.props.setChallengeWinner(this.props.challenge, this.props.challenge.opponent);

  render() {

    let content = null;
    if (this.props.challenge) {
      if (this.isOwner(this.props.challenge, this.props.profile)) {
        content = <ChallengeOwnerView challenge={this.props.challenge} />
      } else if (this.isOpponent(this.props.challenge, this.props.profile)) {
        content = <ChallengeOpponentView
          challenge={this.props.challenge}
          challengeAccepted={this.acceptChallenge}
          challengeRejected={this.rejectChallenge} />
      } else if (this.isReferee(this.props.challenge, this.props.profile)) {
        content = <ChallengeRefereeView
          challenge={this.props.challenge}
          challengeAccepted={this.acceptChallenge}
          challengeRejected={this.rejectChallenge}
          ownerSelectedAsWinner={this.setOwnerAsWinner}
          opponentSelectedAsWinner={this.setOpponentAsWinner} />
      } else {
        content = <h2>Sorry, you don't have permissions to access this challenge!</h2>
      }
    }

    return (
      <div className="ViewChallenge">
        {content}
      </div>);
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
  acceptChallenge: challenge => dispatch(actions.acceptChallenge(challenge)),
  rejectChallenge: (challenge, profile) => dispatch(actions.rejectChallenge(challenge, profile)),
  setChallengeWinner: (challenge, winner) => dispatch(actions.setChallengeWinner(challenge, winner))
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewChallenge);