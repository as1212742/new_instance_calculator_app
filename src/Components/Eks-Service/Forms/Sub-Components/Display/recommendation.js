/** @format */

import React, { useContext } from "react";
import ColumnLayout from "aws-northstar/layouts/ColumnLayout";
import Box from "aws-northstar/layouts/Box";
import "./recommendation.css";
import { Heading, Text } from "aws-northstar";
import { Container } from "reactstrap";
import { DataContext } from "../../../../../Context/Provider/provider";

const Display_Recommendation = () => {
  const { DataState } = useContext(DataContext);
  return Object.keys(DataState.RecommendationDetails).length !== 0 ? (
    <Container className="Result-Box-Container">
      <Heading variant="h5">
        Based on your inputs, this is the lowest-cost EC2 instance:
      </Heading>

      <Box className="Result-Box">
        <div style={{ margin: "5px", marginBottom: "20px" }}>
          <Heading variant="h2" className="Result-Box-Heading">
            {DataState.RecommendationDetails.instanceName}
          </Heading>
        </div>
        <ColumnLayout>
          <div style={{ margin: "5px 0px" }}>
            <Heading variant="h4" title="snd">
              On-Demand hourly cost
            </Heading>
            <Text>
              {Number(DataState.RecommendationDetails.price).toPrecision(4)}
            </Text>
          </div>
          <div style={{ margin: "5px 0px" }}>
            <Heading variant="h4">vCPUs</Heading>
            <Text>{DataState.RecommendationDetails.ins_vcpu}</Text>
          </div>
          <div style={{ margin: "5px 0px" }}>
            <Heading variant="h4">GPUs</Heading>
            <Text>{DataState.RecommendationDetails.GPU}</Text>
          </div>
        </ColumnLayout>
        <ColumnLayout>
          <div style={{ margin: "5px 0px" }}>
            <Heading variant="h4">Memory (GiB)</Heading>
            <Text>{DataState.RecommendationDetails.ins_mem}</Text>
          </div>
          <div style={{ margin: "5px 0px" }}>
            <Heading variant="h4">Network performance</Heading>
            <Text>{DataState.RecommendationDetails.network}</Text>
          </div>
          <div style={{ margin: "5px 0px" }}>
            <Heading variant="h4">physicalProcessor</Heading>
            <Text>{DataState.RecommendationDetails.physicalProcessor}</Text>
          </div>
        </ColumnLayout>
        <ColumnLayout>
          <div style={{ margin: "5px 0px" }}>
            <Heading variant="h4">Pods Per Instance</Heading>
            <Text>{DataState.RecommendationDetails.podsperinstance}</Text>
          </div>
          <div style={{ margin: "5px 0px" }}>
            <Heading variant="h4">Total Instance Required</Heading>
            <Text>{DataState.RecommendationDetails.totalinstancerequired}</Text>
          </div>
          <div style={{ margin: "5px 0px" }}>
            <Heading variant="h4">
              Total Hourly Cost for{" "}
              {DataState.RecommendationDetails.totalinstancerequired}{" "}
              {DataState.RecommendationDetails.instanceName} instance are
            </Heading>
            <Text>
              {DataState.RecommendationDetails.totalcostforinstance.toFixed(2)}{" "}
              $
            </Text>
          </div>
        </ColumnLayout>
      </Box>
    </Container>
  ) : (
    <Container className="Result-Box-Container">
      <Heading variant="h5">
        Based on your inputs, this is the lowest-cost EC2 instance:
      </Heading>
      <Box
        display="flex"
        width="100%"
        height="200px"
        bgcolor="grey.400"
        alignItems="center"
        justifyContent="center"
        margin="10px auto "
      >
        <Heading variant="h2">No Instance Found</Heading>
      </Box>
    </Container>
  );
};

export default Display_Recommendation;
