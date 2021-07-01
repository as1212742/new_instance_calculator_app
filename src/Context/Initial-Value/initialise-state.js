/** @format */
import { getCookie } from "../../Helpers/helper";

export default {
  //instance data
  instancedata: {},
  // in use for loop through operating system
  OperatingSystem: [],
  //in use for loop through regions
  Region: [],
  //in use for putting default
  DefaultValue: {
    totalpods: "100",
    vCPUs: "4",
    memory: "16",
  },
  //in use (either return default set location or in cookie)
  selectedlocation: getCookie("location") || "AWS GovCloud (US-East)",
  //in use
  selectedos: "Linux#NA",
  //in use
  RecommendationDetails: {},
  //in use
  DefaultPricing: {
    OfferingClass: "standard",
    LeaseContractLength: "1yr",
    PurchaseOption: "NoUpfront",
  },
  //in use
  ReservedInstanceData: {},
  //in use
  pricingdisplaydata: {},
  // in use
  estimates: getCookie("estimates-list") || [],
};
