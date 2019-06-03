import './Layout.scss';

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

interface LayoutProps {
  isAuthenticated: boolean;
}

interface LayoutState {
  showSideDrawer: boolean;
}

class Layout extends Component<LayoutProps, LayoutState> {

  state: LayoutState = {
    showSideDrawer: false
  };

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  }

  sideDrawerOpenedHandler = () => {
    this.setState({ showSideDrawer: true });
  }

  render() {
    return (
      <Fragment>
        <Toolbar
          onOpenMenu={this.sideDrawerOpenedHandler}
          isAuthenticated={this.props.isAuthenticated} />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
          isAuthenticated={this.props.isAuthenticated} />
        <main className="Content">{this.props.children}</main>
      </Fragment>
    );
  }
}

const mapStateToProps = (state: any) => ({
  isAuthenticated: state.auth.authenticated,
});

export default connect(mapStateToProps)(Layout);