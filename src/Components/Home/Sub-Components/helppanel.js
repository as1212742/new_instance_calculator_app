/** @format */

import HelpPanel from "aws-northstar/components/HelpPanel";
import Link from "aws-northstar/components/Link";
import Text from "aws-northstar/components/Text";

const helpPanel = (
  <HelpPanel
    header="Amazon EKS"
    learnMoreFooter={[
      <Link href="https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html">
        What is Amazon EKS?
      </Link>,
      <Link href="https://docs.aws.amazon.com/eks/latest/userguide/getting-started.html">
        Getting started with Amazon EKS
      </Link>,
    ]}
  >
    <Text variant="p">
      Amazon Elastic Kubernetes Service (Amazon EKS) is a managed service that
      makes it easy for you to run Kubernetes on AWS without needing to stand up
      or maintain your own Kubernetes control plane. Kubernetes is an
      open-source system for automating the deployment, scaling, and management
      of containerized applications.
      <br />
      <br />
      Applications running on Amazon EKS are fully compatible with applications
      running on any standard Kubernetes environment, whether running in
      on-premises data centers or public clouds. This means that you can easily
      migrate any standard Kubernetes application to Amazon EKS without code
      modification.
    </Text>
  </HelpPanel>
);

export default helpPanel;
