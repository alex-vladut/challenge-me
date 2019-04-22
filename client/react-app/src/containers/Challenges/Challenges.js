import './Challenges.scss';

import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import CountDown from '../../components/CountDown/CountDown';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/actions';

class Challenges extends Component {

  state = {
    type: 'owner'
  }

  componentDidMount() {
    this.props.fetchChallenges();
  }

  updateChallengesFilter = (event) => {
    this.setState({ type: event.target.value });
  }

  getFilter = (type) => {
    switch (type) {
      case 'opponent':
        return (challenge) => challenge.opponent.id === this.props.profile.id;
      case 'referee':
        return (challenge) => challenge.referee.id === this.props.profile.id;
      case 'owner':
      default:
        return (challenge) => challenge.owner.id === this.props.profile.id;
    }
  }

  getSecondsUntilDeadline = (challenge) => {
    const deadline = moment(challenge.deadline);
    const durationUntilDeadline = moment.duration(deadline.diff(moment()));
    return durationUntilDeadline.asSeconds();
  }

  render() {
    let spinner = null;
    if (this.props.loading) {
      spinner = <Spinner />
    }
    let challengesDisplayed = [];
    if (!this.props.loading && !this.props.error) {
      challengesDisplayed = this.props.challenges.filter(this.getFilter(this.state.type))
        .map(challenge => ({ ...challenge, seconds: this.getSecondsUntilDeadline(challenge) }));
    }

    return (
      <div className="Challenges">

        <FormControl component="fieldset">
          <FormLabel component="legend">Filter challenges:</FormLabel>
          <RadioGroup
            aria-label="Challenges filter"
            row
            value={this.state.type}
            onChange={this.updateChallengesFilter} >
            <FormControlLabel
              value="owner"
              control={<Radio />}
              label="My challenges" />
            <FormControlLabel
              value="opponent"
              control={<Radio />}
              label="I am opponent" />
            <FormControlLabel
              value="referee"
              control={<Radio />}
              label="I am referee" />
          </RadioGroup>
        </FormControl>
        {spinner}
        {challengesDisplayed.map(challenge => (
          <Link to={'/challenges/' + challenge.id} key={challenge.id}>
            <div className="ChallengeItem">
              <div>
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
              <div>
                <div className="ChallengeItemLabel">
                  Title
                            </div>
                <div className="ChallengeItemLabel">
                  Deadline
                            </div>
              </div>
            </div>

          </Link>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  challenges: state.challenges,
  loading: state.loading,
  error: state.error,
  profile: state.profile
});

const mapDispatchToProps = dispatch => ({
  fetchChallenges: () => dispatch(actions.fetchChallenges())
});

export default connect(mapStateToProps, mapDispatchToProps)(Challenges);