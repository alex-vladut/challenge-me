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

  acceptChallenge() {
    console.log('TODO: accept challenge');
  }

  rejectChallenge = async () => {
    console.log('TODO: reject challenge');
  }

  isOpponent = (challenge, profile) => challenge.opponent.id === profile.id;

  isReferee = (challenge, profile) => challenge.referee.id === profile.id;

  render() {
    let controls = undefined;
    if (this.props.challenge &&
      (this.isOpponent(this.props.challenge, this.props.profile) || this.isReferee(this.props.challenge, this.props.profile))) {
      controls = (
        <div className="Controls">
          <Button type="confirm" onClick={this.acceptChallenge} >Accept</Button>
          <Button type="danger" onClick={this.rejectChallenge} >Reject</Button>
        </div>
      )
    }
    return (
      <div className="ViewChallenge">
        {controls}

        {
          !this.props.challenge ?
            <Spinner />
            : (<div className="ChallengeElements">
              <div className="ChallengeElement">
                <Label>Title:</Label>
                <p>{this.props.challenge.title}</p>
              </div>
              <div className="ChallengeElement">
                <Label>Rules:</Label>
                {
                  this.props.challenge.rules
                    ? <p>{this.props.challenge.rules}</p>
                    : <p>No rules provided.</p>
                }
              </div>
              <div className="ChallengeElement">
                <Label>Opponent:</Label>
                <p>{this.props.challenge.opponent.name}</p>
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
  profile: state.profile,
  challenge: state.challenge,
});

const mapDispatchToProps = dispatch => ({
  fetchChallenge: challengeId => dispatch(actions.fetchChallenge(challengeId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewChallenge);