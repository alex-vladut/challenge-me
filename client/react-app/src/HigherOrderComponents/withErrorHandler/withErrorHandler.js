import React, { Component, Fragment } from 'react';
import Modal from '../../components/Modal/Modal';

//Unused for now, but could be useful at some point to log an error each time a network error is encountered
const withErrorHandler = (WrappedComponent, axios) => class extends Component {

    state = {
        error: null
    }

    componentWillMount() {
        this.requestInterceptor = axios.interceptors.request.use(request => {
            this.setState({ error: null });
            return request;
        });
        this.responseInterceptor = axios.interceptors.response.use(response => response, error => {
            this.setState({ error });
            return error;
        });
    }

    componentWillUnmount() {
        axios.interceptors.request.eject(this.requestInterceptor);
        axios.interceptors.response.eject(this.responseInterceptor);
    }

    errorConfirmedHandler = () => {
        this.setState({ error: null });
    }

    render() {
        return (<Fragment>
            <Modal
                show={this.state.error}
                onCancel={this.errorConfirmedHandler}>
                {this.state.error ? this.state.error.message : null}
            </Modal>
            <WrappedComponent {...this.props} />
        </Fragment>)
    }
}

export default withErrorHandler;