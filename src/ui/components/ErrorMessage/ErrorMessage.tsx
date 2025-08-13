import React, { FunctionComponent } from "react";

import $ from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  message: string;
  className?: string;
}

const ErrorMessage: FunctionComponent<ErrorMessageProps> = ({ message, className = "" }) => {
  if (!message) return null;

  return (
    <div
      className={$.errorMessage}
      role="alert"
    >
      {message}
    </div>
  );
};

export default ErrorMessage;
