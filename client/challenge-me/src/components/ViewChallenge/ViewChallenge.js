import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Label from '../../components/UI/Label/Label';
import Button from '../../components/UI/Button/Button';
import Message from '../../components/UI/Message/Message';
import Spinner from '../../components/UI/Spinner/Spinner';

import axios from '../../axios';

import './ViewChallenge.css';

class ViewChallenge extends Component {

    //TODO principal
    principal = 'alex';

    state = {
        challenge: null,
        accepted: false,
        rejected: false
    }

    componentDidMount = async () => {
        try {
            const response = await axios.get('/challenges/' + this.props.match.params.challengeId);
            const challenge = response.data;
            this.setState({ challenge });
        } catch (e) {
            console.error(e);
        }
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

    isOpponent = (challenge, principal) => challenge.opponent.id === principal;

    isReferee = (challenge, principal) => challenge.referee.id === principal;

    render() {
        const submitted = this.state.accepted || this.state.rejected;
        let controls = undefined;
        if (this.state.challenge &&
            (this.isOpponent(this.state.challenge, this.principal) || this.isReferee(this.state.challenge, this.principal))) {
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
                    !this.state.challenge ?
                        <Spinner />
                        : (<div className="ChallengeElements">
                            <div className="ChallengeElement">
                                <Label>Title:</Label>
                                <p>{this.state.challenge.title}</p>
                            </div>
                            <div className="ChallengeElement">
                                <Label>Rules:</Label>
                                {
                                    this.state.challenge.rules
                                        ? <p>{this.state.challenge.rules}</p>
                                        : <p>No rules provided.</p>
                                }
                            </div>
                            <div className="ChallengeElement">
                                <Label>Opponent:</Label>
                                <p>{this.state.challenge.opponent.firstName} {this.state.challenge.opponent.lastName}</p>
                            </div>
                            <div className="ChallengeElement">
                                <Label>Referee:</Label>
                                <p>{this.state.challenge.referee.firstName} {this.state.challenge.referee.lastName}</p>
                            </div>
                        </div>)
                }

                <Link to="/challenges/new-challenge" className="BottomRight">+</Link>
            </div>
        );
    }
}


export default ViewChallenge;