/** @format */

import React from "react";
import { Route } from "react-router-dom";
import FrontPage from "../Components/FrontPage/frontpage";
import Pods_Form from "../Components/Eks-Service/Forms/pods-detail-form";
import Estimate from "../Components/Estimate/estimate";

export default [
  <Route exact path="/" component={FrontPage} />,
  <Route exact path="/Elastic-Kubernetes-Service" component={Pods_Form} />,
  <Route exact path="/Estimate" component={Estimate} />,
];
