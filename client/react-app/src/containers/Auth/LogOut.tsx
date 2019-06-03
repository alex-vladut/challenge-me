import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router";

import { SignOut } from '../../store/actions/auth.actions';

interface LogOutProps {
  signOut(): void
}

class LogOut extends Component<LogOutProps> {

  componentDidMount() {
    this.props.signOut()
  }

  render() {
    return (<Redirect to="/" />);
  }

}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: any) => ({
  signOut: () => dispatch(SignOut.create()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogOut);