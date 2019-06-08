import './UserChooser.scss';

import { Divider, Grid, IconButton, Input, Paper } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Spinner from '../../components/UI/Spinner/Spinner';
import User from '../../components/User/User';
import * as actions from '../../store/actions/users.actions';

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
      return (
        <div className="UserChooser">
          <Paper>
            <Grid container justify="center" alignItems="center">
              <Input
                placeholder="Search"
                inputProps={{ 'aria-label': 'Search users' }}
              />
              <IconButton aria-label="Search">
                <SearchIcon />
              </IconButton>
            </Grid>
            <Divider />
          </Paper>

          <div className="UserChooserUsers">
            {this.props.users.map(user =>
              (<User
                onClick={this.props.onSelect}
                user={user}
                key={user.id} />))}
          </div>
        </div>
      )
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