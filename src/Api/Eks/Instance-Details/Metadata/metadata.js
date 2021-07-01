/** @format */

import axios from "axios";

// fetching of metadata from dynamodb
const Instance_MetaData_Fetch = async () => {
  return axios.get(
    "https://impxwqtym6.execute-api.us-east-1.amazonaws.com/DEV/eks/fetch-metadata"
  );
};

export { Instance_MetaData_Fetch };
