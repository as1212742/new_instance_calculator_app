/** @format */

import { ExpandableSection, Heading, Stack, Text } from "aws-northstar";
import { DataContext } from "../../../../../Context/Provider/provider";
import React, { useContext } from "react";

const Instance_Pods_Calculation = () => {
  const { DataState } = useContext(DataContext);

  const temp = DataState.RecommendationDetails;

  return (
    <ExpandableSection header="Show Calculations">
      {Object.keys(temp).length !== 0 ? (
        <Stack spacing="xs">
          {DataState.RecommendationDetails.GPU !== "NA" ? (
            <Text variant="span">
              Pods per instance based on GPU,{" "}
              <b>
                Pods_Num_GPU = Instance GPU / Pods GPU = {temp.GPU} /{" "}
                {temp.podsgpu} = {temp.max_gpu} Pods
              </b>
            </Text>
          ) : null}
          <Text variant="span">
            Pods per instance based on vCPU,{" "}
            <b>
              {" "}
              Pods_Num_vCPU = Instance vCPU / Pods vCPU = {temp.ins_vcpu} /{" "}
              {temp.vCPU} = {temp.max_cpu} Pods
            </b>
          </Text>
          <Text variant="span">
            Pods per instance based on Memory,
            <b>
              {" "}
              Pods_Num_Memory = Instance Memory / Pods Memory = {
                temp.ins_mem
              } / {temp.memory} = {temp.max_memory} Pods
            </b>
          </Text>
          <Text variant="span">
            Pods per instance based on ENI,
            <b>
              {" "}
              Pods_Num_ENI = ( Instance ENI No * (Instance ENI IP - 1 )) + 2 = (
              {temp.eni_ip}-1) * {temp.eni_no} + 2 = {temp.max_eni} Pods
            </b>
          </Text>
          {DataState.RecommendationDetails.GPU !== "NA" ? (
            <Text variant="span">
              Pods per Instance based on the above 4 conditions is,
              <b>
                {" "}
                Pods_No_Ins = min(Pods_Num_GPU, Pods_Num_vCPU, Pods_Num_Memory,
                Pods_Num_ENI ) = min({temp.max_gpu}, {temp.max_cpu},{" "}
                {temp.max_memory}, {temp.max_eni} ) = {temp.podsperinstance}{" "}
                Pods
              </b>
            </Text>
          ) : (
            <Text variant="span">
              Pods per Instance based on the above 3 conditions is,{" "}
              <b>
                {" "}
                Pods_No_Ins = min( Pods_Num_vCPU, Pods_Num_Memory, Pods_Num_ENI
                ) = min( {temp.max_cpu}, {temp.max_memory}, {temp.max_eni} ) ={" "}
                {temp.podsperinstance} Pods
              </b>
            </Text>
          )}
          <Text variant="span">
            Total needed for {temp.Pods} Pods,
            <b>
              {" "}
              Ins_Total_No = Total Pods /Pods_No_Ins = {temp.Pods} /{" "}
              {temp.podsperinstance} = {temp.totalinstancerequired} instance
            </b>
          </Text>
          <Heading variant="h4">
            Total instance Price,{" "}
            <b>
              {" "}
              Ins_Total_Price = Total Ins_Total_No * Instance Price ={" "}
              {temp.totalinstancerequired} * {temp.price} ={" "}
              {temp.totalcostforinstance}
            </b>
          </Heading>
        </Stack>
      ) : null}
    </ExpandableSection>
  );
};

export default Instance_Pods_Calculation;
