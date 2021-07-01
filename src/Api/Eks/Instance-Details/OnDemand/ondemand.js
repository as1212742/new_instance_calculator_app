/** @format */

import axios from "axios";

//fetching of instance data from dynamodb
const OnDemand_Instance_Details_Fetch = async (data) => {
  const options = {
    url: "https://impxwqtym6.execute-api.us-east-1.amazonaws.com/DEV/eks/fetch-data",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: JSON.stringify(data),
  };

  return axios(options);
};

export { OnDemand_Instance_Details_Fetch };
