import React, { Component } from 'react';
import User from '../User/User';
import Spinner from '../UI/Spinner/Spinner';

import axios from '../../axios'

class UserChooser extends Component {

    state = {
        users: [],
        loading: false,
        error: false
    }

    componentDidMount = () => {
        this.loadUsers();
    }

    loadUsers = async () => {
        try {
            this.setState({
                loading: true,
                error: false
            });

            const response = await axios.get('/users');
            const users = response.data.users;

            this.setState({ users });
        } catch (e) {
            console.error('There was an error when retrieving the list of users:', e);
            this.setState({ error: true });
        } finally {
            this.setState({ loading: false });
        }
    }

    render() {
        if (this.state.loading) {
            return <Spinner />
        } else if (this.state.error) {
            return (<div>Something went wrong. Please try again tomorrow :)</div>)
        } else {
            return this.state.users.map(user =>
                (<User
                    onClick={this.props.onSelect}
                    user={user}
                    key={user.id} />))
        }
    }
}

export default UserChooser;