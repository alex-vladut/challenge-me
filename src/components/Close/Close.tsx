import "./Close.scss";

import React, { FunctionComponent } from "react";

interface CloseProps {
  onClick(event: any): void;
}

const Close: FunctionComponent<CloseProps> = (props: CloseProps) => (
  <div onClick={props.onClick} className="Close">
    ✖
  </div>
);

export default Close;
