import React from "react";
import PropTypes from "prop-types";

function Notification({ message }) {
  return <div>{message}</div>;
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Notification;
