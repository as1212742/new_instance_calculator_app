/** @format */

import axios from "axios";

//fetching of instance data from dynamodb
const Reserved_1yr_allupfront_convertible = async (data) => {
  const options = {
    url: "https://impxwqtym6.execute-api.us-east-1.amazonaws.com/DEV/eks/fetch-reserved/1yr-allupfront-convertible",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: JSON.stringify(data),
  };

  return axios(options);
};
//fetching of instance data from dynamodb
const Reserved_1yr_allupfront_reserved = async (data) => {
  const options = {
    url: "https://impxwqtym6.execute-api.us-east-1.amazonaws.com/DEV/eks/fetch-reserved/1yr-allupfront-reserved",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: JSON.stringify(data),
  };

  return axios(options);
};
//fetching of instance data from dynamodb
const Reserved_1yr_noupfront_reserved = async (data) => {
  const options = {
    url: "https://impxwqtym6.execute-api.us-east-1.amazonaws.com/DEV/eks/fetch-reserved/1yr-noupfront-reserved",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: JSON.stringify(data),
  };

  return axios(options);
};
//fetching of instance data from dynamodb
const Reserved_1yr_noupfront_convertible = async (data) => {
  const options = {
    url: "https://impxwqtym6.execute-api.us-east-1.amazonaws.com/DEV/eks/fetch-reserved/1yr-noupfront-convertible",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: JSON.stringify(data),
  };

  return axios(options);
};
//fetching of instance data from dynamodb
const Reserved_1yr_partialupfront_convertible = async (data) => {
  const options = {
    url: "https://impxwqtym6.execute-api.us-east-1.amazonaws.com/DEV/eks/fetch-reserved/1yr-partialupfront-convertible",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: JSON.stringify(data),
  };

  return axios(options);
};
//fetching of instance data from dynamodb
const Reserved_1yr_partialupfront_reserved = async (data) => {
  const options = {
    url: "https://impxwqtym6.execute-api.us-east-1.amazonaws.com/DEV/eks/fetch-reserved/1yr-partialupfront-reserved",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: JSON.stringify(data),
  };

  return axios(options);
};
//fetching of instance data from dynamodb
const Reserved_3yr_allupfront_convertible = async (data) => {
  const options = {
    url: "https://impxwqtym6.execute-api.us-east-1.amazonaws.com/DEV/eks/fetch-reserved/3yr-allupfront-convertible",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: JSON.stringify(data),
  };

  return axios(options);
};
//fetching of instance data from dynamodb
const Reserved_3yr_allupfront_reserved = async (data) => {
  const options = {
    url: "https://impxwqtym6.execute-api.us-east-1.amazonaws.com/DEV/eks/fetch-reserved/3yr-allupfront-reserved",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: JSON.stringify(data),
  };

  return axios(options);
};
//fetching of instance data from dynamodb
const Reserved_3yr_noupfront_convertible = async (data) => {
  const options = {
    url: "https://impxwqtym6.execute-api.us-east-1.amazonaws.com/DEV/eks/fetch-reserved/3yr-noupfront-convertible",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: JSON.stringify(data),
  };

  return axios(options);
};
//fetching of instance data from dynamodb
const Reserved_3yr_noupfront_reserved = async (data) => {
  const options = {
    url: "https://impxwqtym6.execute-api.us-east-1.amazonaws.com/DEV/eks/fetch-reserved/3yr-noupfront-reserved",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: JSON.stringify(data),
  };

  return axios(options);
};
//fetching of instance data from dynamodb
const Reserved_3yr_partialupfront_convertible = async (data) => {
  const options = {
    url: "https://impxwqtym6.execute-api.us-east-1.amazonaws.com/DEV/eks/fetch-reserved/3yr-partialupfront-convertible",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: JSON.stringify(data),
  };

  return axios(options);
};
//fetching of instance data from dynamodb
const Reserved_3yr_partialupfront_reserved = async (data) => {
  const options = {
    url: "https://impxwqtym6.execute-api.us-east-1.amazonaws.com/DEV/eks/fetch-reserved/3yr-partialupfront-reserved",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: JSON.stringify(data),
  };

  return axios(options);
};

export {
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
};
