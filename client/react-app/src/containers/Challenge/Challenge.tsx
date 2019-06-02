import './Challenge.scss';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import DateTimePicker from '../../components/UI/DateTimePicker/DateTimePicker';
import UserInput from '../../components/UserInput/UserInput';
import { CreateChallenge, CreateChallengeInit } from '../../store/actions/challenges.actions';

interface ChallengeProps {
  challengeCreated: boolean
  onInitCreateChallenge(): void
  onCreateChallenge(challenge: any):void
}

interface ChallengeState {
  title: string,
  opponent: any,
  referee: any,
  deadline: moment.Moment,
  errors: any
}

class Challenge extends Component<ChallengeProps, ChallengeState> {

  state: ChallengeState = {
    title: '',
    opponent: {},
    referee: {},
    deadline: moment(),
    errors: {
      titleError: null,
      opponentError: null,
      refereeError: null,
      deadlineError: null
    }
  }

  componentDidMount() {
    this.props.onInitCreateChallenge();
  }

  selectOpponent = (opponent: any) => {
    this.setState({ opponent });
  }

  selectReferee = (referee: any) => {
    this.setState({ referee });
  }

  validate = () => {
    const errors: any = {};
    let isValid = true;
    if (!this.state.title) {
      errors.titleError = 'Please provide a title.';
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
      this.props.onCreateChallenge({
        title: this.state.title,
        opponent: this.state.opponent.id,
        referee: this.state.referee.id,
        deadline: this.state.deadline.toISOString()
      });
    }
  }

  updateTitle = (event: any) => {
    this.setState({ title: event.target.value });
  }

  updateDeadline = (dateTime: string) => {
    this.setState({ deadline: moment(dateTime) });
  }

  render() {
    let challenge = (<Redirect to="/challenges" />);
    if (!this.props.challengeCreated) {
      challenge = (
        <div className="Challenge">
          <TextField
            required
            id="outlined-required"
            label="Title"
            defaultValue={this.state.title}
            onChange={this.updateTitle}
            margin="normal"
            fullWidth
            variant="outlined"
          />
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
            dateTime={this.state.deadline.toDate()}
            onChange={this.updateDeadline}
            errorMessage={this.state.errors.deadlineError} />

          <Button variant="contained" color="primary" onClick={this.createChallenge}>Create challenge</Button>
        </div>
      )
    }
    return challenge;
  }
}

const mapStateToProps = (state: any) => ({
  challengeCreated: state.challenges.challengeCreated
});

const mapDispatchToProps = (dispatch: any) => ({
  onInitCreateChallenge: () => dispatch(CreateChallengeInit.create()),
  onCreateChallenge: (challenge: any) => dispatch(CreateChallenge.create(challenge))
});

export default connect(mapStateToProps, mapDispatchToProps)(Challenge);;