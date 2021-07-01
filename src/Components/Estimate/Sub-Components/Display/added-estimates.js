/** @format */

import {
  Button,
  Form,
  FormField,
  FormSection,
  Grid,
  Heading,
  Inline,
  Text,
} from "aws-northstar";
import { DataContext } from "../../../../Context/Provider/provider";
import React, { useContext, useEffect, useState } from "react";
import {
  getCookie,
  setCookie,
  Transform_OS_Data,
} from "../../../../Helpers/helper";

const AddedEstimates = () => {
  const [data, setdata] = useState();
  const { DataState, SetEstimates } = useContext(DataContext);

  useEffect(() => {
    if (getCookie("estimates-list") !== "") {
      setdata(JSON.parse(getCookie("estimates-list")));
    } else {
      setdata([]);
    }
  }, [DataState.estimates]);

  const onClickRemove = (e) => {
    const temp = data.filter((res, i) => i !== e);
    setCookie("estimates-list", JSON.stringify(temp), 1);
    SetEstimates(temp);
    setdata(temp);
  };

  console.log("data", data);
  return (
    <>
      {data != undefined ? (
        data.map((est, i) => {
          if (est.DefaultPricing.OfferingClass !== "OnDemand") {
            const arr = est.pricing.sk.split("#");
            const type = est.pricing.sk.startsWith("eks")
              ? "Amazon Elastic Kubernetes Service"
              : "Amazon Elastic Container Service";

            const monthlycost = (
              est.pricing.values.price_Hrs *
              2 *
              365 *
              est.recommendationDetails.totalinstancerequired
            )
              .toFixed(2)
              .toString()
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

            return (
              <Form
                actions={
                  <div>
                    <Button variant="primary" onClick={() => onClickRemove(i)}>
                      Remove
                    </Button>
                  </div>
                }
              >
                <FormSection
                  header={type}
                  description={<b>Region: {est.pricing.pk}</b>}
                >
                  <FormField stretch={true}>
                    <Heading variant="h2">{arr[10]}</Heading>
                    <Inline>
                      <Heading variant="h5">
                        Offering Class: <b>{arr[9]} Reserved Instances</b>
                      </Heading>
                      <Heading variant="h5">
                        Period: <b>{arr[7]}</b>
                      </Heading>
                      <Heading variant="h5">
                        Payment Type: <b>{arr[8]}</b>
                      </Heading>
                      <Heading variant="h5">
                        Total Pods: <b>{est.recommendationDetails.Pods}</b>
                      </Heading>
                      <Heading variant="h5">
                        Pods Per Instance:{" "}
                        <b>{est.recommendationDetails.podsperinstance}</b>
                      </Heading>
                      <Heading variant="h5">
                        Total Instance:{" "}
                        <b>{est.recommendationDetails.totalinstancerequired}</b>
                      </Heading>
                    </Inline>
                    <br />

                    <Heading variant="h4"> Pods Details:</Heading>
                    <Inline>
                      <Text>
                        Pods vCPU: <b>{est.recommendationDetails.vCPU}</b>
                      </Text>
                      <Text>
                        Pods Memory: <b>{est.recommendationDetails.memory}</b>
                      </Text>

                      {est.recommendationDetails.GPU !== "NA" ? (
                        <Text>
                          Pods GPU: <b>{est.recommendationDetails.GPU}</b>
                        </Text>
                      ) : null}
                    </Inline>
                    <br />
                    <Heading variant="h4">Instance Details:</Heading>
                    <Grid container spacing={12}>
                      <Grid item xs={8}>
                        <Text>
                          Operating System({Transform_OS_Data(arr[1], arr[2])}),
                          memory(
                          {est.pricing.values.memory}), Processor(
                          {est.pricing.values.physicalProcessor}), vCPU(
                          {est.pricing.values.vcpu}), Network(
                          {est.pricing.values.networkPerformance})
                        </Text>
                      </Grid>
                      <Grid item xs={2}>
                        <Heading variant="h4">
                          Monthly Cost: {monthlycost}
                        </Heading>
                      </Grid>

                      <Grid item xs={2}>
                        {"price_Quantity" in est.pricing.values && (
                          <Heading variant="h4">
                            Upfront Cost:{" "}
                            {(
                              est.pricing.values.price_Quantity *
                              est.recommendationDetails.totalinstancerequired
                            )
                              .toFixed(2)
                              .toString()
                              .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
                          </Heading>
                        )}
                      </Grid>
                    </Grid>
                  </FormField>
                </FormSection>
              </Form>
            );
          } else {
            const type =
              est.recommendationDetails.service === "eks"
                ? "Amazon Elastic Kubernetes Service"
                : "Amazon Elastic Container Service";

            const monthlycost = (
              est.recommendationDetails.price *
              2 *
              365 *
              est.recommendationDetails.totalinstancerequired
            )
              .toFixed(2)
              .toString()
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

            return (
              <Form
                actions={
                  <div>
                    <Button variant="primary" onClick={() => onClickRemove(i)}>
                      Remove
                    </Button>
                  </div>
                }
              >
                <FormSection
                  header={type}
                  // description={<b>Region: {est.pricing.pk}</b>}
                >
                  <FormField stretch={true}>
                    <Heading variant="h2">
                      {est.recommendationDetails.instanceName}
                    </Heading>
                    <Inline>
                      <Heading variant="h5">
                        Offering Class: <b> OnDemand</b>
                      </Heading>
                      <Heading variant="h5">
                        Total Pods: <b>{est.recommendationDetails.Pods}</b>
                      </Heading>
                      <Heading variant="h5">
                        Pods Per Instance:{" "}
                        <b>{est.recommendationDetails.podsperinstance}</b>
                      </Heading>
                      <Heading variant="h5">
                        Total Instance:{" "}
                        <b>{est.recommendationDetails.totalinstancerequired}</b>
                      </Heading>
                    </Inline>
                    <br />

                    <Heading variant="h4"> Pods Details:</Heading>
                    <Inline>
                      <Text>
                        Pods vCPU: <b>{est.recommendationDetails.vCPU}</b>
                      </Text>
                      <Text>
                        Pods Memory: <b>{est.recommendationDetails.memory}</b>
                      </Text>

                      {est.recommendationDetails.GPU !== "NA" ? (
                        <Text>
                          Pods GPU: <b>{est.recommendationDetails.GPU}</b>
                        </Text>
                      ) : null}
                    </Inline>
                    <br />
                    <Heading variant="h4">Instance Details:</Heading>
                    <Grid container spacing={12}>
                      <Grid item xs={8}>
                        <Text>
                          {/* Operating System({Transform_OS_Data(arr[1], arr[2])}), */}
                          memory(
                          {est.recommendationDetails.ins_mem}), Processor(
                          {est.recommendationDetails.physicalProcessor}), vCPU(
                          {est.recommendationDetails.ins_vcpu}), Network(
                          {est.recommendationDetails.network})
                        </Text>
                      </Grid>
                      <Grid item xs={2}>
                        <Heading variant="h4">
                          Monthly Cost: {monthlycost}
                        </Heading>
                      </Grid>
                    </Grid>
                  </FormField>
                </FormSection>
              </Form>
            );
          }
        })
      ) : (
        <Heading variant="h1">No Estimate To Show</Heading>
      )}
    </>
  );
};

export default AddedEstimates;
