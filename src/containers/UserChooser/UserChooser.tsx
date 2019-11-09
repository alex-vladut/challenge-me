import "./UserChooser.scss";

import { Divider, Grid, IconButton, Input, Paper } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import React, { Component } from "react";
import { connect } from "react-redux";

import Spinner from "../../components/UI/Spinner/Spinner";
import User from "../../components/User/User";
import { FetchUsers } from "../../store/actions/users.actions";

interface Props {
  loading: boolean;
  users: any[];
  fetchUsers(filter: string): void;
  onSelect(user: any): void;
}

interface State {
  filter: string;
}

class UserChooser extends Component<Props, State> {
  state: State = {
    filter: ""
  };

  componentDidMount = () => {
    this.props.fetchUsers("");
  };

  setFilter = (event: any) => {
    this.setState({ filter: event.target.value });
  };

  render() {
    let content = null;
    if (this.props.loading) {
      content = <Spinner />;
    } else if (this.props.users.length === 0) {
      content = <p>Sorry, no users found :(</p>;
    } else {
      content = (
        <div className="UserChooserUsers">
          {this.props.users.map(user => (
            <User onClick={this.props.onSelect} user={user} key={user.id} />
          ))}
        </div>
      );
    }
    return (
      <div className="UserChooser">
        <Paper>
          <Grid container justify="center" alignItems="center">
            <Input
              placeholder="Search"
              inputProps={{ "aria-label": "Search users" }}
              value={this.state.filter}
              onChange={this.setFilter}
            />
            <IconButton aria-label="Search" onClick={() => this.props.fetchUsers(this.state.filter)}>
              <SearchIcon />
            </IconButton>
          </Grid>
          <Divider />
        </Paper>

        {content}
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  users: state.users.users,
  loading: state.users.loading
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchUsers: (filter: string) => dispatch(FetchUsers.create(filter))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserChooser);
