/** @format */

import Heading from "aws-northstar/components/Heading";
import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Grid, HelpPanel } from "aws-northstar";
import { useHistory } from "react-router-dom";
import { getCookie, setCookie } from "../../../../../Helpers/helper";
import { DataContext } from "../../../../../Context/Provider/provider";

const Pricing_Display = () => {
  const history = useHistory();
  const { DataState, SetEstimates } = useContext(DataContext);
  const [data, setdata] = useState({});
  const [recommendationDetails, setrecommendationDetails] = useState({});
  const [DefaultPricing, setDefaultPricing] = useState({});

  useEffect(() => {
    setdata(DataState.pricingdisplaydata);
    setrecommendationDetails(DataState.RecommendationDetails);
    setDefaultPricing(DataState.DefaultPricing);
  }, [DataState.pricingdisplaydata]);

  const content = (
    <>
      {Object.keys(data).length > 0 ? (
        <Grid>
          {"totalcostforinstance" in data ? null : (
            <Grid container spacing={3}>
              <Grid item xs={10}>
                <Heading variant="h3">
                  All Upfront Cost (
                  {DataState.RecommendationDetails.totalinstancerequired}{" "}
                  instance)
                </Heading>
              </Grid>
              <Grid item xs={2}>
                <Heading variant="h2">
                  {"totalcostforinstance" in data
                    ? "0"
                    : "price_Quantity" in data.values
                    ? (
                        data.values.price_Quantity *
                        DataState.RecommendationDetails.totalinstancerequired
                      )
                        .toString()
                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
                    : "0"}{" "}
                  $
                </Heading>
              </Grid>
            </Grid>
          )}
          <Grid container spacing={3}>
            <Grid item xs={10}>
              <Heading variant="h3">
                {"totalcostforinstance" in data
                  ? `Amazon EC2 OnDemand instances (hours) for ${DataState.RecommendationDetails.totalinstancerequired} instance`
                  : `Amazon EC2 Reserved instances (monthly) for ${DataState.RecommendationDetails.totalinstancerequired} instance`}
              </Heading>
            </Grid>
            <Grid item xs={2}>
              <Heading variant="h2">
                {"totalcostforinstance" in data
                  ? data.totalcostforinstance.toFixed(2)
                  : (
                      data.values.price_Hrs *
                      2 *
                      365 *
                      DataState.RecommendationDetails.totalinstancerequired
                    )
                      .toFixed(2)
                      .toString()
                      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}{" "}
                $
              </Heading>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Heading variant="h3">No Estimate to Show</Heading>
      )}
    </>
  );

  const SetEstimatesInCookie = () => {
    const arr = getCookie("estimates-list");
    let obj = {
      pricing: data,
      recommendationDetails: recommendationDetails,
      DefaultPricing: DefaultPricing,
    };

    if (arr === "") {
      const temp = [];
      temp.push(obj);
      SetEstimates(temp);
      setCookie("estimates-list", JSON.stringify(temp), 1);
    } else {
      const temp = JSON.parse(arr);
      temp.push(obj);
      SetEstimates(temp);
      setCookie("estimates-list", JSON.stringify(temp), 1);
    }
  };

  const onSubmit = () => {
    SetEstimatesInCookie();
    Object.keys(data).length > 0 && history.push("/Estimate");
  };

  return (
    <Form
      actions={
        <div>
          <Button variant="link" onClick={() => history.push("/")}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => onSubmit()}
            disabled={Object.keys(data).length > 0 ? false : true}
          >
            Add to my estimate
          </Button>
        </div>
      }
    >
      <HelpPanel header="Amazon EC2 estimate">
        {DataState.RecommendationDetails !== undefined ? (
          content
        ) : (
          <Heading>No Estimate to Display</Heading>
        )}
      </HelpPanel>
      <br />
    </Form>
  );
};

export default Pricing_Display;
