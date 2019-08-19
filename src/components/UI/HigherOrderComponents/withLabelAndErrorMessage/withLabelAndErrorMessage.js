import React, { Component } from "react";

import Label from "../../Label/Label";
import ErrorLabel from "../../ErrorLabel/ErrorLabel";

const withLabelAndErrorMessage = WrappedComponent =>
  class extends Component {
    render() {
      return (
        <div>
          {this.props.label && <Label>{this.props.label}</Label>}
          <WrappedComponent {...this.props} />
          {this.props.errorMessage && (
            <ErrorLabel>{this.props.errorMessage}</ErrorLabel>
          )}
        </div>
      );
    }
  };

export default withLabelAndErrorMessage;
