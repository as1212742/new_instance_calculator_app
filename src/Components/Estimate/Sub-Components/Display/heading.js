/** @format */

import Button from "aws-northstar/components/Button";
import Inline from "aws-northstar/layouts/Inline";
import { useHistory } from "react-router-dom";
import React, { useContext } from "react";
import { delete_cookie } from "../../../../Helpers/helper";
import { HeadingStripe } from "aws-northstar";
import { DataContext } from "../../../../Context/Provider/provider";

const Heading = () => {
  const history = useHistory();
  const { SetEstimates } = useContext(DataContext);

  const onClearEstimate = () => {
    delete_cookie("estimates-list");
    SetEstimates([]);
  };

  const actionButtons = (
    <Inline>
      <Button
        iconAlign="right"
        icon="add_plus"
        size="medium"
        onClick={() => history.push("/")}
      >
        Add Estimate
      </Button>
      {/* <Button iconAlign="right" icon="add_plus" size="medium">
        Group Estimate
      </Button> */}
      <Button icon="Remove" iconAlign="right" onClick={() => onClearEstimate()}>
        Clear Estimates
      </Button>
      <Button variant="primary" icon="folder" iconAlign="right">
        Download Csv
      </Button>
    </Inline>
  );

  return <HeadingStripe title="My Estimate" actionButtons={actionButtons} />;
};

export default Heading;
