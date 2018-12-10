import React, { Component } from 'react';

import Modal from '../Modal/Modal';
import UserChooser from '../UserChooser/UserChooser';
import withLabelAndErrorMessage from '../UI/HigherOrderComponents/withLabelAndErrorMessage/withLabelAndErrorMessage';

import './UserInput.css';

class UserInput extends Component {

    state = {
        isUserChooserOpen: false,
    }

    selectUser = (user) => {
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
        return (
            <div
                className={cssClasses.join(' ')}
                onClick={this.toggleUserChooser}>
                {
                    this.props.user ?
                        (this.props.user.name)
                        : "Please select a user"
                }

                {
                    //TODO currently UserChooser is loaded every time; make sure it's only rendered when selecting a user
                    //this is required because this is already loading all the users here
                }
                <Modal
                    show={this.state.isUserChooserOpen}
                    onCancel={this.toggleUserChooser}>
                    <UserChooser onSelect={this.selectUser} />
                </Modal>
            </div>
        );
    }
}

export default withLabelAndErrorMessage(UserInput);