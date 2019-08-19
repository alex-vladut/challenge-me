import React from "react";

import "./Button.css";

const button = props => {
  const classes = props.type === "danger" ? ["Button", "Danger"] : ["Button", "Confirm"];
  return (
    <button onClick={props.onClick} className={classes.join(" ")} {...props}>
      {props.children}
    </button>
  );
};

export default button;
