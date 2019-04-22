import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/actions';
import Spinner from '../UI/Spinner/Spinner';
import User from '../User/User';

class UserChooser extends Component {

  componentDidMount = () => {
    this.props.fetchUsers();
  }

  render() {
    if (this.props.loading) {
      return <Spinner />
    } else if (this.props.error) {
      return (<div>{this.props.error}</div>)
    } else {
      return this.props.users.map(user =>
        (<User
          onClick={this.props.onSelect}
          user={user}
          key={user.id} />))
    }
  }
}

const mapStateToProps = state => ({
  users: state.users,
  loading: state.loading,
  error: state.error
});

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(actions.fetchUsers())
})

export default connect(mapStateToProps, mapDispatchToProps)(UserChooser);