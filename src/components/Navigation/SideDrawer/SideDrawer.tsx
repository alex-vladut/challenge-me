import "./SideDrawer.scss";

import React, { FunctionComponent } from "react";

import Close from "../../Close/Close";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";

interface SideDrawerProps {
  isAuthenticated: boolean;
  open: boolean;
  closed(): void;
}

const SideDrawer: FunctionComponent<SideDrawerProps> = props => {
  const sideDrawerClasses = props.open ? ["SideDrawer", "Open"] : ["SideDrawer", "Close"];
  return (
    <div className={sideDrawerClasses.join(" ")}>
      <div style={{ height: "11%" }}>
        <Logo />
      </div>
      <Close onClick={props.closed} />
      <nav>
        <NavigationItems onClick={props.closed} isAuthenticated={props.isAuthenticated} />
      </nav>
    </div>
  );
};

export default SideDrawer;
