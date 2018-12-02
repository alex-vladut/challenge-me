import React, { Component } from 'react';

import { Auth, API } from 'aws-amplify';
import { Authenticator } from 'aws-amplify-react';

import { connect } from 'react-redux';

import * as actions from '../../store/actions/actions';

import './Home.css';

class Home extends Component {

    signOut = async () => {
        try {
            await Auth.signOut();
            this.setState({
                authenticated: false,
                profile: null
            });
        } catch (error) {
            console.log(error.response);
        }
    }

    authStateChanged = async (authState) => {
        if (authState === 'signedIn') {
            try {
                const profile = await API.get('ChallengeMeAPI', '/profile');
                this.setState({ profile, authenticated: true });
            } catch (error) {
                if (error.response.status === 404) {
                    const authenticatedUser = await Auth.currentAuthenticatedUser();
                    const profile = await API.post('ChallengeMeAPI', '/profile', {
                        body: {
                            name: authenticatedUser.name
                        }
                    });
                    this.setState({ profile, authenticated: true });
                } else {
                    console.log(error.response);
                }
            }
        } else if (authState === 'signedOut') {
            this.setState({ authenticated: false });
        }
    }

    render() {
        const federated = {
            google_client_id: '348450922576-ndqrghsmiguadj32uehn4f9f5kjkoja1.apps.googleusercontent.com'
        }
        let authenticate = null;
        if (!this.state.authenticated) {
            authenticate = (
                <Authenticator
                    federated={federated}
                    onStateChange={this.authStateChanged} />
            );
        }
        let signOut = null;
        if (this.state.authenticated) {
            signOut = (<div><button onClick={this.signOut}>Sign Out</button></div>)
        }

        return (
            <div>
                <div className="HomeBackground"></div>
                <h1>Nothing interesting here...</h1>
                {authenticate}
                {signOut}
            </div>
        );
    }
};

const mapStateToProps = state => ({
    profile: state.profile,
    authenticated: state.authenticated,
    loading: state.loading,
    error: state.error
});

const mapDispatchToProps = dispatch => ({
    fetchProfile: () => dispatch(actions.fetchProfile())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);