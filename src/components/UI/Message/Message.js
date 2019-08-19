import React from "react";

import "./Message.css";

const message = props => {
  let messageClass = "InfoMessage";
  if (props.type === "successful") {
    messageClass = "SuccessfulMessage";
  } else if (props.type === "error") {
    messageClass = "ErrorMessage";
  }
  return <p className={messageClass}>{props.children}</p>;
};

export default message;
