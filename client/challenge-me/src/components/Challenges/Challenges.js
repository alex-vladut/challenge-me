import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import CountDown from '../CountDown/CountDown';

import axios from '../../axios';
import moment from 'moment';

import './Challenges.css';

class Challenges extends Component {

    //TODO check if user is authorised - move it to localStorage
    principal = 'alex';

    state = {
        challenges: [],
        type: 'owner'
    }

    componentDidMount = async () => {
        try {
            const response = await axios.get('/challenges');
            const challenges = response.data.challenges;
            this.setState({ challenges });
        } catch (e) {
            console.error(e);
        }
    }

    updateChallengesFilter = (event) => {
        this.setState({ type: event.target.value });
    }

    getFilter = (type) => {
        switch (type) {
            case 'opponent':
                return (challenge) => challenge.opponent === this.principal;
            case 'referee':
                return (challenge) => challenge.referee === this.principal;
            case 'owner':
            default:
                return (challenge) => challenge.owner === this.principal;
        }
    }

    getSecondsUntilDeadline = (challenge) => {
        const deadline = moment(challenge.deadline);
        const durationUntilDeadline = moment.duration(deadline.diff(moment()));
        return durationUntilDeadline.asSeconds();
    }

    render() {
        const challengesDisplayed = this.state.challenges.filter(this.getFilter(this.state.type))
            .map(challenge => ({ ...challenge, seconds: this.getSecondsUntilDeadline(challenge) }));
        return (
            <div>
                <p>Filter which challenges you are interested in:</p>
                <select value={this.state.type} onChange={this.updateChallengesFilter}>
                    <option value="owner">My Challenges</option>
                    <option value="opponent">I'm opponent</option>
                    <option value="referee">I'm referee</option>
                </select>

                {challengesDisplayed.map(challenge => (
                    <Link to={'/challenges/' + challenge.id} key={challenge.id}>
                        <div className="ChallengeItem">
                            <div className="ChallengeTitle">
                                {challenge.title}
                            </div>
                            <div className="ChallengeDeadline">
                                {
                                    challenge.seconds >= 0
                                        ? <CountDown seconds={challenge.seconds} />
                                        : "Challenge expired"
                                }
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        );
    }
}

export default Challenges;