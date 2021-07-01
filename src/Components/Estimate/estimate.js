/** @format */

import React from "react";
import Header from "./Sub-Components/Display/heading";
import BreadCrumbs from "../BreadCrumbs/breadcrumbs";
import TotalEstimate from "./Sub-Components/Display/total-estimate";
import AddedEstimates from "./Sub-Components/Display/added-estimates";

const Estimate = () => {
  return (
    <BreadCrumbs>
      <Header />
      <TotalEstimate />
      <AddedEstimates />
    </BreadCrumbs>
  );
};

export default Estimate;
