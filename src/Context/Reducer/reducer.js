/** @format */

import Data from "../State-Mapping/state-mapping";

const DataReducer = (state, action) => {
  switch (action.type) {
    //in use
    case Data.SET_REGION:
      return {
        ...state,
        Region: {
          region: action.payload,
        },
      };
    //in use
    case Data.SET_OS:
      return {
        ...state,
        OperatingSystem: action.payload,
      };
    // in use
    case Data.SET_DEFAULTS:
      return {
        ...state,
        DefaultValue: action.payload,
      };
    //in use
    case Data.SET_SELECTED_REGION:
      return {
        ...state,
        selectedlocation: action.payload,
      };
    //in use
    case Data.SET_SELECTED_OS:
      return {
        ...state,
        selectedos: action.payload,
      };
    //in use
    case Data.SET_INSTANCE_DATA:
      return {
        ...state,
        instancedata: action.payload,
      };
    //in use
    case Data.SET_RECOMMENDATION_DETAILS:
      return {
        ...state,
        RecommendationDetails: action.payload,
      };
    //in use
    case Data.SET_DEFAULT_PRICING:
      return {
        ...state,
        DefaultPricing: action.payload,
      };
    //in use
    case Data.SET_RESERVED_INSTANCE_DATA:
      return {
        ...state,
        ReservedInstanceData: action.payload,
      };
    //in use
    case Data.SET_PRICING_DISPLAY_DATA:
      return {
        ...state,
        pricingdisplaydata: action.payload,
      };
    //in use
    case Data.SET_ESTIMATES:
      return {
        ...state,
        estimates: action.payload,
      };
    default:
      return state;
  }
};

export default DataReducer;
