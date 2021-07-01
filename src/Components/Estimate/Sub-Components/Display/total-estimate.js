/** @format */

import { Container, Grid, Heading } from "aws-northstar";
import React, { useContext, useEffect, useState } from "react";
import { getCookie } from "../../../../Helpers/helper";
import { DataContext } from "../../../../Context/Provider/provider";

const Totalestimate = () => {
  const [data, setdata] = useState();
  const { DataState } = useContext(DataContext);
  const [monthlycost, setmonthlycost] = useState(0);
  const [upfrontcost, setupfrontcost] = useState(0);

  const CalculateCost = () => {
    let monthcost = 0;
    let upcost = 0;

    data.map((est) => {
      let mcost = 0;

      if (est.DefaultPricing.OfferingClass == "OnDemand") {
        mcost = Number(
          est.recommendationDetails.price *
            24 *
            30 *
            est.recommendationDetails.totalinstancerequired
        );
      } else {
        mcost = Number(
          est.pricing.values.price_Hrs *
            24 *
            30 *
            est.recommendationDetails.totalinstancerequired
        );
      }

      let val = 0;
      if (
        est.DefaultPricing.OfferingClass !== "OnDemand" &&
        "price_Quantity" in est.pricing.values
      ) {
        val = Number(
          est.pricing.values.price_Quantity *
            est.recommendationDetails.totalinstancerequired
        );
      }

      monthcost = monthcost + mcost;
      upcost = upcost + val;
    });

    setmonthlycost(monthcost);
    setupfrontcost(upcost);
  };

  useEffect(() => {
    data !== undefined && CalculateCost();
  }, [data]);

  useEffect(() => {
    if (getCookie("estimates-list") !== "") {
      setdata(JSON.parse(getCookie("estimates-list")));
    } else {
      setdata([]);
    }
  }, [DataState.estimates]);

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Heading variant="h2">First 12 months total</Heading>
          <Heading variant="h2">
            {(monthlycost * 12)
              .toFixed(2)
              .toString()
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
          </Heading>
        </Grid>
        <Grid item xs={3}>
          <Heading variant="h2">Total upfront</Heading>
          <Heading variant="h2">
            {upfrontcost.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
          </Heading>
        </Grid>
        <Grid item xs={3}>
          <Heading variant="h2">Total monthly</Heading>
          <Heading variant="h2">
            {monthlycost
              .toFixed(2)
              .toString()
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
          </Heading>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Totalestimate;
