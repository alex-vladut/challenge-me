import './UserInput.scss';

import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';

import userIcon from '../../assets/user.ico';
import Modal from '../Modal/Modal';
import withLabelAndErrorMessage from '../UI/HigherOrderComponents/withLabelAndErrorMessage/withLabelAndErrorMessage';
import UserChooser from '../UserChooser/UserChooser';

class UserInput extends Component {

  state = {
    isUserChooserOpen: false,
  }

  selectUser = user => {
    this.props.onSelect(user);

    this.toggleUserChooser();
  }

  toggleUserChooser = (e) => {
    e && e.preventDefault();
    this.setState({ isUserChooserOpen: !this.state.isUserChooserOpen });
  }

  render() {
    const cssClasses = ["UserInput"];
    if (this.props.errorMessage) {
      cssClasses.push("UserInputInvalid");
    }
    let modal = null;
    if (this.state.isUserChooserOpen) {
      modal = (<Modal
        show={this.state.isUserChooserOpen}
        onCancel={this.toggleUserChooser}>
        <UserChooser onSelect={this.selectUser} />
      </Modal>);
    }
    return (
      <div
        className={cssClasses.join(' ')}
        onClick={this.toggleUserChooser}>
        <Grid container>
          <Avatar alt={this.props.user.name} src={this.props.user.pictureUrl || userIcon} style={{ marginLeft: '0.25rem' }} />
          <p>{this.props.user.name || 'Select a user'}</p>
        </Grid>
        {modal}
      </div>
    );
  }
}

export default withLabelAndErrorMessage(UserInput);