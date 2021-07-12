/** @format */

import React, { useContext, useEffect, useState } from "react";
import PodsDetails from "./Sub-Components/pods-details";
import BreadCrumbs from "../../BreadCrumbs/breadcrumbs";
import PricingStratagy from "./Sub-Components/pricing-stratagy";
import PricingDisplay from "./Sub-Components/Display/pricing";
import { HeadingStripe } from "aws-northstar";
import { DataContext } from "../../../Context/Provider/provider";
import Loading from "../../LoadingPage/loading";
import Region from "../../Region/region";
import { getCookie, Transform_OS_Data } from "../../../Helpers/helper";
import { OnDemand_Instance_Details_Fetch } from "../../../Api/Eks/Instance-Details/OnDemand/ondemand";
import { Instance_MetaData_Fetch } from "../../../Api/Eks/Instance-Details/Metadata/metadata";
import {
  Reserved_1yr_allupfront_convertible,
  Reserved_1yr_allupfront_reserved,
  Reserved_1yr_noupfront_reserved,
  Reserved_1yr_noupfront_convertible,
  Reserved_1yr_partialupfront_convertible,
  Reserved_1yr_partialupfront_reserved,
  Reserved_3yr_allupfront_convertible,
  Reserved_3yr_allupfront_reserved,
  Reserved_3yr_noupfront_convertible,
  Reserved_3yr_noupfront_reserved,
  Reserved_3yr_partialupfront_convertible,
  Reserved_3yr_partialupfront_reserved,
} from "../../../Api/Eks/Instance-Details/Reserved/reserved";

const Instance_Detail_Form_1 = () => {
  const {
    DataState,
    SetRegion,
    SetOS,
    SetInstanceData,
    SetReservedInstanceData,
  } = useContext(DataContext);
  const [IsLoading, setIsLoading] = useState(0);

  // filter metadata
  const Filter_Data = (metadata) => {
    // filtering of region from raw data
    const region_data = metadata.region.sort().map((reg, i) => {
      return {
        value: i,
        label: reg,
      };
    });
    // removing of empty data from os data
    for (var i = 0; i < metadata.operatingSystem.length; i++) {
      if (metadata.operatingSystem[i] === "NA#NA") {
        metadata.operatingSystem.splice(i, 1);
      }
    }

    // filtering of os data from raw data
    const operatingSystem_data = metadata.operatingSystem
      .sort()
      .map((os, i) => {
        let [ops, type] = os.split("#");
        const osresult = Transform_OS_Data(ops, type);
        return {
          value: i,
          label: osresult,
          os: os,
        };
      });

    SetOS(operatingSystem_data);
    SetRegion(region_data);
  };

  //merge all data into one object
  const Merge_All_Data = (
    r1,
    r2,
    r3,
    r4,
    r5,
    r6,
    r7,
    r8,
    r9,
    r10,
    r11,
    r12
  ) => {
    const data = {
      "1yr#AllUpfront#convertible": r1.data.body,
      "1yr#AllUpfront#standard": r2.data.body,
      "1yr#NoUpfront#standard": r3.data.body,
      "1yr#NoUpfront#convertible": r4.data.body,
      "1yr#PartialUpfront#convertible": r5.data.body,
      "1yr#PartialUpfront#standard": r6.data.body,
      "3yr#AllUpfront#convertible": r7.data.body,
      "3yr#AllUpfront#standard": r8.data.body,
      "3yr#NoUpfront#convertible": r9.data.body,
      "3yr#NoUpfront#standard": r10.data.body,
      "3yr#PartialUpfront#convertible": r11.data.body,
      "3yr#PartialUpfront#standard": r12.data.body,
    };
    SetReservedInstanceData(data);
  };

  const Data_Fetch = async () => {
    setIsLoading(1);
    //page refresh  whenever location or os changes
    //if location present in cookie always take from cookie first it removes most of the problems
    let loc = DataState.selectedlocation;

    const data = {
      location: loc,
      os: DataState.selectedos,
    };
    const response = OnDemand_Instance_Details_Fetch(data);
    const response2 = Instance_MetaData_Fetch();
    const [instanceData, filterData] = await Promise.all([response, response2]);
    Filter_Data(filterData.data.body[0]);
    SetInstanceData(instanceData.data.body);
    const [r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11, r12] =
      await Promise.all([
        Reserved_1yr_allupfront_convertible(data),
        Reserved_1yr_allupfront_reserved(data),
        Reserved_1yr_noupfront_reserved(data),
        Reserved_1yr_noupfront_convertible(data),
        Reserved_1yr_partialupfront_convertible(data),
        Reserved_1yr_partialupfront_reserved(data),
        Reserved_3yr_allupfront_convertible(data),
        Reserved_3yr_allupfront_reserved(data),
        Reserved_3yr_noupfront_convertible(data),
        Reserved_3yr_noupfront_reserved(data),
        Reserved_3yr_partialupfront_convertible(data),
        Reserved_3yr_partialupfront_reserved(data),
      ]);
    setIsLoading(0);
    Merge_All_Data(r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11, r12);
  };

  // only renders once not a problem
  useEffect(() => {
    Data_Fetch();
  }, [DataState.selectedlocation, DataState.selectedos]);

  return (
    <BreadCrumbs>
      <HeadingStripe title="Configure Pods Details" />
      {IsLoading ? (
        <Loading />
      ) : (
        <>
          <Region />
          <PodsDetails />
          <PricingStratagy />
          <PricingDisplay />
        </>
      )}
    </BreadCrumbs>
  );
};

export default Instance_Detail_Form_1;
