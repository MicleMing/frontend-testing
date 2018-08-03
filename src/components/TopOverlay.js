import React from "react";
import PropTypes from "prop-types";

export default class TopOverlay extends React.Component {
  static propTypes = {
    style: PropTypes.object,
    children: PropTypes.node,
  };

  render() {
    const {
      style,
      children,
    } = this.props;

    return (
      <div
        style={{
          color: "white",
          background: "linear-gradient(rgba(85, 85, 85, 0.5), transparent)",
          ...style,
        }}
      >
        {children}
      </div>
    );
  }
}
