/** @format */

import React, { createContext, useReducer } from "react";
import DataReducer from "../Reducer/reducer";
import InitialState from "../Initial-Value/initialise-state";
import Mapping_Type from "../State-Mapping/state-mapping";

export const DataContext = createContext({
  ...InitialState,
});

export const DataProvider = (props) => {
  const [DataState, Datadispatch] = useReducer(DataReducer, InitialState);

  //in use
  const SetRegion = (region) => {
    Datadispatch({
      type: Mapping_Type.SET_REGION,
      payload: region,
    });
  };
  //in use
  const SetOS = (data) => {
    Datadispatch({
      type: Mapping_Type.SET_OS,
      payload: data,
    });
  };
  //in  use
  const SetDefaults = (data) => {
    Datadispatch({
      type: Mapping_Type.SET_DEFAULTS,
      payload: data,
    });
  };
  //in use
  const SetSelectedOSData = (data) => {
    Datadispatch({
      type: Mapping_Type.SET_SELECTED_OS,
      payload: data,
    });
  };
  //in use
  const SetSelectedRegion = (data) => {
    Datadispatch({
      type: Mapping_Type.SET_SELECTED_REGION,
      payload: data,
    });
  };
  //in use
  const SetInstanceData = (data) => {
    Datadispatch({
      type: Mapping_Type.SET_INSTANCE_DATA,
      payload: data,
    });
  };
  //in use
  const SetRecommendationDetails = (data) => {
    Datadispatch({
      type: Mapping_Type.SET_RECOMMENDATION_DETAILS,
      payload: data,
    });
  };
  //in use
  const SetDefaultPricing = (data) => {
    Datadispatch({
      type: Mapping_Type.SET_DEFAULT_PRICING,
      payload: data,
    });
  };
  //in use
  const SetReservedInstanceData = (data) => {
    Datadispatch({
      type: Mapping_Type.SET_RESERVED_INSTANCE_DATA,
      payload: data,
    });
  };
  //in use
  const SetPricingDisplayData = (data) => {
    Datadispatch({
      type: Mapping_Type.SET_PRICING_DISPLAY_DATA,
      payload: data,
    });
  };
  //in use
  const SetEstimates = (data) => {
    Datadispatch({
      type: Mapping_Type.SET_ESTIMATES,
      payload: data,
    });
  };

  return (
    <DataContext.Provider
      value={{
        DataState,
        SetRegion,
        SetDefaults,
        SetOS,
        SetSelectedOSData,
        SetSelectedRegion,
        SetInstanceData,
        SetRecommendationDetails,
        SetDefaultPricing,
        SetReservedInstanceData,
        SetPricingDisplayData,
        SetEstimates,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};
