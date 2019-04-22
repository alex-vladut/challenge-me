import './NavigationItems.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/actions';
import NavigationItem from './NavigationItem/NavigationItem';

class NavigationItems extends Component {

    render() {
        let navItems = null;
        if (this.props.authenticated) {
            navItems = (
                <ul className="NavigationItems">
                    <NavigationItem link="/" onClick={this.props.onClick} exact >Home</NavigationItem>
                    <NavigationItem link="/challenges/new-challenge" onClick={this.props.onClick} >New Challenge</NavigationItem>
                    <NavigationItem link="/challenges" onClick={this.props.onClick} >Challenges</NavigationItem>
                    <NavigationItem link="/" onClick={this.props.signOut} >Sign Out</NavigationItem>
                </ul>
            )
        }

        return navItems;
    }
}

const mapStateToProps = state => ({
    authenticated: state.authenticated,
});

const mapDispatchToProps = dispatch => ({
    signOut: () => dispatch(actions.signOut())
});

export default connect(mapStateToProps, mapDispatchToProps)(NavigationItems);