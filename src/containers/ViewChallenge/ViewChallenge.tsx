import "./ViewChallenge.scss";

import React, { Component } from "react";
import { connect } from "react-redux";

import { AcceptChallenge, FetchChallenge, RejectChallenge, SetChallengeWinner } from "../../store/actions/challenges.actions";
import ChallengeOpponentView from "./Opponent/ChallengeOpponentView";
import ChallengeOwnerView from "./Owner/ChallengeOwnerView";
import ChallengeRefereeView from "./Referee/ChallengeRefereeView";

interface ViewChallengeProps {
  challenge: any;
  profile: any;
  match: any;
  fetchChallenge(challengeId: string): void;
  acceptChallenge(challenge: any): void;
  rejectChallenge(challenge: any): void;
  setChallengeWinner(challenge: any, user: any): void;
}

class ViewChallenge extends Component<ViewChallengeProps> {
  componentDidMount() {
    this.props.fetchChallenge(this.props.match.params.challengeId);
  }

  acceptChallenge = () => {
    this.props.acceptChallenge(this.props.challenge);
  };

  rejectChallenge = async () => {
    this.props.rejectChallenge(this.props.challenge);
  };

  private isOwner = (challenge: any, profile: any) => challenge.owner.id === profile.id;

  private isOpponent = (challenge: any, profile: any) => challenge.opponent.id === profile.id;

  private isReferee = (challenge: any, profile: any) => challenge.referee.id === profile.id;

  private setOwnerAsWinner = () => this.props.setChallengeWinner(this.props.challenge, this.props.challenge.owner);

  private setOpponentAsWinner = () => this.props.setChallengeWinner(this.props.challenge, this.props.challenge.opponent);

  render() {
    let content = null;
    if (this.props.challenge) {
      if (this.isOwner(this.props.challenge, this.props.profile)) {
        content = <ChallengeOwnerView challenge={this.props.challenge} />;
      } else if (this.isOpponent(this.props.challenge, this.props.profile)) {
        content = <ChallengeOpponentView challenge={this.props.challenge} challengeAccepted={this.acceptChallenge} challengeRejected={this.rejectChallenge} />;
      } else if (this.isReferee(this.props.challenge, this.props.profile)) {
        content = (
          <ChallengeRefereeView
            challenge={this.props.challenge}
            challengeAccepted={this.acceptChallenge}
            challengeRejected={this.rejectChallenge}
            ownerSelectedAsWinner={this.setOwnerAsWinner}
            opponentSelectedAsWinner={this.setOpponentAsWinner}
          />
        );
      } else {
        content = <h2>Sorry, you don't have permissions to access this challenge!</h2>;
      }
    }

    return <div className="ViewChallenge">{content}</div>;
  }
}

const mapStateToProps = (state: any) => ({
  profile: state.auth.profile,
  challenge: state.challenges.challenge
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchChallenge: (challengeId: string) => dispatch(FetchChallenge.create(challengeId)),
  acceptChallenge: (challenge: any) => dispatch(AcceptChallenge.create(challenge)),
  rejectChallenge: (challenge: any) => dispatch(RejectChallenge.create(challenge)),
  setChallengeWinner: (challenge: any, winner: any) => dispatch(SetChallengeWinner.create({ challenge, winner }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewChallenge);
