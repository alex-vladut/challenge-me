import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/users.actions';
import Spinner from '../UI/Spinner/Spinner';
import User from '../User/User';

interface UserChooserProps {
  loading: boolean
  error: string
  users: any[]
  fetchUsers(): void
  onSelect(user: any): void
}

class UserChooser extends Component<UserChooserProps> {

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

const mapStateToProps = (state: any) => ({
  users: state.challenges.users,
  loading: state.challenges.loading,
  error: state.challenges.error
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchUsers: () => dispatch(actions.fetchUsers())
});

export default connect(mapStateToProps, mapDispatchToProps)(UserChooser);