/** @format */

import { ColumnLayout, Heading } from "aws-northstar";
import RadioGroup, { RadioButton } from "aws-northstar/components/RadioGroup";
import Container from "aws-northstar/layouts/Container";
import { DataContext } from "../../../../Context/Provider/provider";
import AlertPrice from "./Alerts/price";
import React, { useContext, useEffect, useState } from "react";
import ReservedCalculation from "./Show-Calculations/reserved";

const Pricing_Stratagy = () => {
  const { DataState, SetPricingDisplayData, SetDefaultPricing } =
    useContext(DataContext);
  const [Instance_Type, setInstance_Type] = useState("");
  const [Reservation_Type, setReservation_Type] = useState("");
  const [Payment_Type, setPayment_Type] = useState("");

  const calculatePrice = () => {
    if (
      Object.keys(DataState.RecommendationDetails).length > 0 &&
      Object.keys(DataState.ReservedInstanceData).length > 0
    ) {
      let match_data = undefined;

      if (Instance_Type === "OnDemand") {
        SetPricingDisplayData(DataState.RecommendationDetails);
        return;
      }

      if (
        Instance_Type !== "" &&
        Reservation_Type !== "" &&
        Payment_Type !== ""
      )
        match_data =
          Reservation_Type + "#" + Payment_Type + "#" + Instance_Type;
      else
        match_data =
          DataState.DefaultPricing.LeaseContractLength +
          "#" +
          DataState.DefaultPricing.PurchaseOption +
          "#" +
          DataState.DefaultPricing.OfferingClass;

      const data = DataState.ReservedInstanceData[match_data];

      if (
        data !== undefined &&
        DataState.RecommendationDetails.instanceName in data
      ) {
        SetPricingDisplayData(
          data[DataState.RecommendationDetails.instanceName]
        );
      } else {
        SetPricingDisplayData({});
      }

      return undefined;
    }
  };

  const SetSelection = () => {
    const data = {
      OfferingClass: Instance_Type,
      LeaseContractLength: Reservation_Type,
      PurchaseOption: Payment_Type,
    };

    SetDefaultPricing(data);
  };

  useEffect(() => {
    if (
      Instance_Type !== "" &&
      Reservation_Type !== "" &&
      Payment_Type !== ""
    ) {
      calculatePrice();
      SetSelection();
    }
  }, [Instance_Type, Reservation_Type, Payment_Type]);

  useEffect(() => {
    setInstance_Type(DataState.DefaultPricing.OfferingClass);
    setReservation_Type(DataState.DefaultPricing.LeaseContractLength);
    setPayment_Type(DataState.DefaultPricing.PurchaseOption);
    calculatePrice();
  }, [DataState.RecommendationDetails, DataState.ReservedInstanceData]);

  const onChangeRadioInstanceType = (e) => {
    setInstance_Type(e.target.value);
  };
  const onChangeRadioReservationType = (e) => {
    setReservation_Type(e.target.value);
  };
  const onChangeRadioPaymentType = (e) => {
    setPayment_Type(e.target.value);
  };

  return (
    <>
      <Container headingVariant="h2" title="Pricing strategy">
        {Object.keys(DataState.pricingdisplaydata).length === 0 && (
          <AlertPrice />
        )}
        <ColumnLayout>
          <Heading variant="h2">Pricing model</Heading>
          <Heading variant="h2">Reservation term</Heading>
          <Heading variant="h2">Payment options</Heading>
        </ColumnLayout>
        <br></br>
        <ColumnLayout>
          <RadioGroup
            items={[
              <RadioButton
                value="standard"
                checked={Instance_Type === "standard"}
                onChange={(e) => onChangeRadioInstanceType(e)}
              >
                <Heading variant="h5">Standard Reserved Instances</Heading>
              </RadioButton>,
              <RadioButton
                value="convertible"
                checked={Instance_Type === "convertible"}
                onChange={(e) => onChangeRadioInstanceType(e)}
              >
                <Heading variant="h5"> Convertible Reserved Instances</Heading>
              </RadioButton>,
              <RadioButton
                value="OnDemand"
                checked={Instance_Type === "OnDemand"}
                onChange={(e) => onChangeRadioInstanceType(e)}
              >
                <Heading variant="h5"> On-Demand Instances </Heading>
              </RadioButton>,
            ]}
          />
          <RadioGroup
            items={[
              <RadioButton
                value="1yr"
                checked={Reservation_Type === "1yr"}
                onChange={onChangeRadioReservationType}
                disabled={Instance_Type === "OnDemand"}
              >
                <Heading variant="h5">1 Year</Heading>
              </RadioButton>,
              <RadioButton
                value="3yr"
                checked={Reservation_Type === "3yr"}
                onChange={onChangeRadioReservationType}
                disabled={Instance_Type === "OnDemand"}
              >
                <Heading variant="h5">3 Year</Heading>
              </RadioButton>,
            ]}
          />
          <RadioGroup
            items={[
              <RadioButton
                value="NoUpfront"
                checked={Payment_Type === "NoUpfront"}
                onChange={onChangeRadioPaymentType}
                disabled={Instance_Type === "OnDemand"}
              >
                <Heading variant="h5">No Upfront</Heading>
              </RadioButton>,
              <RadioButton
                value="PartialUpfront"
                checked={Payment_Type === "PartialUpfront"}
                onChange={onChangeRadioPaymentType}
                disabled={Instance_Type === "OnDemand"}
              >
                <Heading variant="h5"> Partial Upfront</Heading>
              </RadioButton>,
              <RadioButton
                value="AllUpfront"
                checked={Payment_Type === "AllUpfront"}
                onChange={onChangeRadioPaymentType}
                disabled={Instance_Type === "OnDemand"}
              >
                <Heading variant="h5">All Upfront</Heading>
              </RadioButton>,
            ]}
          />
        </ColumnLayout>
        <br />
        <ReservedCalculation />
      </Container>
    </>
  );
};

export default Pricing_Stratagy;
