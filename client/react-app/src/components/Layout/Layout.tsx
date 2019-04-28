import './Layout.scss';

import React, { Component, Fragment } from 'react';

import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Toolbar from '../Navigation/Toolbar/Toolbar';

interface LayoutProps { }

interface LayoutState {
  showSideDrawer: boolean
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
        <Toolbar onOpenMenu={this.sideDrawerOpenedHandler} />
        <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
        <main className="Content">{this.props.children}</main>
      </Fragment>
    );
  }
}

export default Layout;