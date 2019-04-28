import React, { Component, Fragment } from 'react';

class CountDown extends Component {

  constructor() {
    super();
    this.state = { time: {} };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  componentDidMount() {
    const seconds = this.props.seconds;

    let timeLeftVar = this.secondsToTime(seconds);
    this.setState({ time: timeLeftVar, seconds });

    this.startTimer(seconds);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  startTimer(seconds) {
    if (this.timer === 0 && seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });

    // Check if we're at zero.
    if (seconds === 0) {
      clearInterval(this.timer);
    }
  }

  render() {
    return (
      <Fragment>
        {this.state.time.h}h {this.state.time.m}m {this.state.time.s}s
      </Fragment>
    );
  }
}

export default CountDown;