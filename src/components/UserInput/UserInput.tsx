import './UserInput.scss';

import { Avatar, Grid } from '@material-ui/core';
import React, { Component } from 'react';

import userIcon from '../../assets/user.png';
import withLabelAndErrorMessage from '../UI/HigherOrderComponents/withLabelAndErrorMessage/withLabelAndErrorMessage';

interface UserInputProps {
  user: any
  errorMessage: string
  onClick(): void
}

class UserInput extends Component<UserInputProps> {

  render() {
    const cssClasses = ["UserInput"];
    if (this.props.errorMessage) {
      cssClasses.push("UserInputInvalid");
    }
    return (
      <div
        className={cssClasses.join(' ')}
        onClick={this.props.onClick}>
        <Grid container>
          <Avatar alt={this.props.user.name} src={this.props.user.pictureUrl || userIcon} style={{ marginLeft: '0.25rem' }} />
          <p>{this.props.user.name || 'Select a user'}</p>
        </Grid>
      </div>
    );
  }
}

export default withLabelAndErrorMessage(UserInput);