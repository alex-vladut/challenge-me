import React, { Component } from 'react';
import { connect } from 'react-redux';

import Label from '../../components/UI/Label/Label';
import Button from '../../components/UI/Button/Button';
import Message from '../../components/UI/Message/Message';
import Spinner from '../../components/UI/Spinner/Spinner';

import axios from '../../axios';
import { API } from 'aws-amplify';
import * as actions from '../../store/actions/actions';

import './ViewChallenge.css';

class ViewChallenge extends Component {

  state = {
    challenge: null,
    accepted: false,
    rejected: false
  }

  componentDidMount() {
    this.props.fetchChallenge(this.props.match.params.challengeId);
  }

  acceptChallenge = async () => {
    try {
      await axios.post('/challenges/' + this.props.match.params.challengeId + "/accept");
      this.setState({ accepted: true });
    } catch (e) {
      console.error(e);
    }
  }

  rejectChallenge = async () => {
    try {
      await axios.post('/challenges/' + this.props.match.params.challengeId + "/reject");
      this.setState({ rejected: true });
    } catch (e) {
      console.error(e);
    }
  }

  isOpponent = (challenge, profile) => challenge.opponentId === profile.id;

  isReferee = (challenge, profile) => challenge.refereeId === profile.id;

  render() {
    console.log(this.props.challenge);
    const submitted = this.state.accepted || this.state.rejected;
    let controls = undefined;
    if (this.props.challenge &&
      (this.isOpponent(this.props.challenge, this.props.profile) || this.isReferee(this.props.challenge, this.props.profile))) {
      controls = (
        <div className="Controls">
          <Button type="confirm" onClick={this.acceptChallenge} disabled={submitted} >Accept</Button>
          <Button type="danger" onClick={this.rejectChallenge} disabled={submitted} >Reject</Button>
        </div>
      )
    }
    let successfulMessage = null;
    if (this.state.accepted) {
      successfulMessage = <Message type="successful">You have accepted the challenge!</Message>
    }
    let rejectedMessage = null;
    if (this.state.rejected) {
      rejectedMessage = <Message type="successful">You have rejected the challenge!</Message>
    }
    return (
      <div className="ViewChallenge">
        <div>
          {successfulMessage}
          {rejectedMessage}
        </div>
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
                <p>{this.props.challenge.opponent}</p>
              </div>
              <div className="ChallengeElement">
                <Label>Referee:</Label>
                <p>{this.props.challenge.referee}</p>
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