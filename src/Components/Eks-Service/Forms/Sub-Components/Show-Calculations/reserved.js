/** @format */

import { ExpandableSection, Heading, Inline, Stack, Text } from "aws-northstar";
import { DataContext } from "../../../../../Context/Provider/provider";
import React, { useContext } from "react";

const Instance_Pods_Calculation = () => {
  const { DataState } = useContext(DataContext);

  const temp = DataState.RecommendationDetails;

  return (
    <>
      {DataState.DefaultPricing.OfferingClass === "OnDemand" ? null : (
        <ExpandableSection header="Show Calculations">
          {Object.keys(DataState.pricingdisplaydata).length > 0 ? (
            <Stack>
              <Inline>
                <Heading variant="h4">
                  Total monthly cost = Number of Instance * Total Monthly cost ={" "}
                  {DataState.RecommendationDetails.totalinstancerequired} *{" "}
                  {(
                    DataState.pricingdisplaydata.values.price_Hrs *
                    2 *
                    365
                  ).toFixed(2)}{" "}
                  ={" "}
                  {(
                    DataState.pricingdisplaydata.values.price_Hrs *
                    2 *
                    365 *
                    DataState.RecommendationDetails.totalinstancerequired
                  )
                    .toFixed(2)
                    .toString()
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
                </Heading>
              </Inline>

              {"price_Quantity" in DataState.pricingdisplaydata.values && (
                <>
                  <Heading variant="h4">
                    Total Upfront cost = Number of Instance * Upfront Cost per
                    Instance ={" "}
                    {DataState.RecommendationDetails.totalinstancerequired} *{" "}
                    {DataState.pricingdisplaydata.values.price_Quantity} ={" "}
                    {(
                      DataState.pricingdisplaydata.values.price_Quantity *
                      DataState.RecommendationDetails.totalinstancerequired
                    )
                      .toFixed(2)
                      .toString()
                      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
                  </Heading>
                </>
              )}
            </Stack>
          ) : null}
        </ExpandableSection>
      )}
    </>
  );
};

export default Instance_Pods_Calculation;
