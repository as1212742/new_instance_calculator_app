/** @format */

import React from "react";
import { useHistory } from "react-router-dom";
import ecs_image from "../../Assets/images/ecs.png";
import eks_image from "../../Assets/images/eks.png";
import "./frontpage.css";

const FrontPage = () => {
  const history = useHistory();

  const routeChange = (path) => {
    history.push(path);
  };

  const DemoBox = () => {
    return (
      <div className="card-container">
        <div className="eks-col eks-card" onClick={() => routeChange("")}>
          <h2 className="card-heading">ECS</h2>
          <div className="icon-wrapper">
            <img className="icon" src={ecs_image} alt="..." />
          </div>
          <p className="eks-card-paragraph">price based on task size</p>
          <p className="eks-card-paragraph">Require netowork modal</p>
          <p className="eks-card-paragraph">
            AWS- manageinfra structure, No amazon EC2 instence
          </p>
        </div>
        <div
          className="eks-col eks-card"
          onClick={() => routeChange("/Elastic-Kubernetes-Service")}
        >
          <h2 className="card-heading">EKS</h2>
          <div className="icon-wrapper">
            <img className="icon" src={eks_image} alt="..." />
          </div>
          <h2 className="eks-card-paragraph">
            Calculate number of Instances required for running Pods
          </h2>
          <h3 className="eks-card-paragraph">
            Recommendation of Instances Provided
          </h3>
          <h3 className="eks-card-paragraph">
            You can override the Recommended Settings
          </h3>
        </div>
      </div>
    );
  };

  return <DemoBox />;
};

export default FrontPage;
