import React, { Component } from 'react';

import { Authenticator } from 'aws-amplify-react';

import { connect } from 'react-redux';

import * as actions from '../../store/actions/actions';

import './Home.css';

class Home extends Component {

    authStateChanged = async (authState) => {
        if (authState === 'signedIn') {
            this.props.fetchProfile();
        } else if (authState === 'signedOut') {
            this.props.signOut();
        }
    }

    render() {
        const federated = {
            google_client_id: '348450922576-hvs2fv955qfv4rjci73b7c3r944mkkdq.apps.googleusercontent.com'
        }
        let authenticate = null;
        if (!this.props.authenticated) {
            authenticate = (
                <Authenticator
                    federated={federated}
                    onStateChange={this.authStateChanged} />
            );
        }

        return (
            <div>
                <div className="HomeBackground"></div>
                <h1>Nothing interesting here...</h1>
                {authenticate}
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
    fetchProfile: () => dispatch(actions.fetchProfile()),
    signOut: () => dispatch(actions.signOut())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);