/** @format */

import { Alert } from "aws-northstar";
import React from "react";

const Alert_Instance = () => {
  return (
    <div style={{ marginBottom: "10px" }}>
      <Alert type="error">
        Selected Pricing is not available for this instance
      </Alert>
    </div>
  );
};

export default Alert_Instance;
