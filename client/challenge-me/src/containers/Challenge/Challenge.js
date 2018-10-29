import React, { Component } from 'react';
import { connect } from 'react-redux';

import moment from 'moment';

import UserInput from '../../components/UserInput/UserInput';
import Input from '../../components/UI/Input/Input';
import TextArea from '../../components/UI/TextArea/TextArea';
import Button from '../../components/UI/Button/Button';
import DateTimePicker from '../../components/UI/DateTimePicker/DateTimePicker';

import axios from '../../axios';

import './Challenge.css';

class Challenge extends Component {

    state = {
        title: null,
        rules: null,
        opponent: null,
        referee: null,
        deadline: moment(),
        errors: {
            titleError: null,
            rulesError: null,
            opponentError: null,
            refereeError: null,
            deadlineError: null
        }
    }

    selectOpponent = (opponent) => {
        this.setState({ opponent });
    }

    selectReferee = (referee) => {
        this.setState({ referee });
    }

    validate = () => {
        const errors = {};
        let isValid = true;
        if (!this.state.title) {
            errors.titleError = 'Please provide a title.';
            isValid = false;
        }
        if (!this.state.rules) {
            errors.rulesError = 'Please provide some rules for your challenge.';
            isValid = false;
        }
        if (!this.state.opponent) {
            errors.opponentError = 'Please select an opponent.';
            isValid = false;
        }
        if (!this.state.referee) {
            errors.refereeError = 'Please select a referee.';
            isValid = false;
        }
        if (this.state.deadline.isBefore(moment().add(30, 'minutes'))) {
            errors.deadlineError = 'Please select a deadline that is at least 30 minutes in the future.';
            isValid = false;
        }

        this.setState({ errors });

        return isValid;
    }

    createChallenge = async () => {
        if (this.validate()) {
            try {
                const response = await axios.post('/challenges', {
                    title: this.state.title,
                    rules: this.state.rules,
                    opponentId: this.state.opponent.id,
                    refereeId: this.state.referee.id,
                    deadline: this.state.deadline.toISOString()
                });
                const newChallengeId = response.data.id;
                this.props.history.replace('/challenges/' + newChallengeId);
            } catch (e) {
                console.error(e);
            }
        }
    }

    updateTitle = (event) => {
        this.setState({ title: event.target.value });
    }

    updateRules = (event) => {
        this.setState({ rules: event.target.value });
    }

    updateDeadline = (dateTime) => {
        this.setState({ deadline: dateTime });
    }

    render() {
        return (
            <div className="Challenge">
                <Input
                    label="Title:"
                    placeholder="Type a short title for your challenge"
                    errorMessage={this.state.errors.titleError}
                    onChange={this.updateTitle} />
                <TextArea
                    label="Rules:"
                    onChange={this.updateRules}
                    errorMessage={this.state.errors.rulesError} />
                <UserInput
                    label="Opponent:"
                    user={this.state.opponent}
                    onSelect={this.selectOpponent}
                    errorMessage={this.state.errors.opponentError} />
                <UserInput
                    label="Referee:"
                    user={this.state.referee}
                    onSelect={this.selectReferee}
                    errorMessage={this.state.errors.refereeError} />
                <DateTimePicker
                    label="Deadline:"
                    dateTime={this.state.deadline}
                    onChange={this.updateDeadline}
                    errorMessage={this.state.errors.deadlineError} />

                <Button onClick={this.createChallenge}>Create challenge</Button>
            </div>
        )
    }
}

const mapStateToProps = state => ({ ...state });
const mapDispatchToProps = dispatch => ({
    onCreateChallenge: challenge => dispatch({ type: 'CREATE_CHALLENGE', challenge })
});

export default connect(mapStateToProps, mapDispatchToProps)(Challenge);;