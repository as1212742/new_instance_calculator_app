/** @format */

const Instance_Details_Fetch = async (data) => {
  const options = {
    url: "https://impxwqtym6.execute-api.us-east-1.amazonaws.com/DEV/region-instance-details",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: JSON.stringify(data),
  };

  axios(options)
    .then((response) => {
      localStorage.setItem("Instance_Details", response.data.body);
    })
    .then((err) => console.log(err))
    .then(() => history.push("/Pods/Config"));
};

// SetInstanceDetails(data);

Instance_Details_Fetch(data);

// page 2

const onFocusProcessor = () => {
  const Data = JSON.parse(localStorage.getItem("Instance_Details"));
  setStatusType("loading");
  const UniqueProcessor = lodash.uniqBy(Data, function (ins) {
    return ins.physicalProcessor;
  });
  const ProcessorType = UniqueProcessor.map((ins, i) => {
    return {
      value: i,
      label: ins.physicalProcessor,
    };
  });
  setProcessorTypes(ProcessorType);
  setStatusType("finished");
};

const onChangeProcessor = (e) => {
  const Data = JSON.parse(localStorage.getItem("Instance_Details"));
  const Selected_Processor = ProcessorTypes.find(
    (pro) => pro.value === e.target.value
  );
  ProcessorSetSeletedOption(Selected_Processor);
  const Processor_Data = lodash.filter(Data, function (ins) {
    return ins.physicalProcessor === Selected_Processor.label;
  });
  localStorage.setItem("Processor_Details", JSON.stringify(Processor_Data));
  // setShiftTopic(1);
};

const onFocusEBS = () => {
  const Data = JSON.parse(localStorage.getItem("Processor_Details"));
  setStatusType("loading");
  const UniqueEBS = lodash.uniqBy(Data, function (ins) {
    return ins.storage;
  });
  const StorageType = UniqueEBS.map((ins, i) => {
    return {
      value: i,
      label: ins.storage,
    };
  });
  setEBSStorageTypes(StorageType);
  setStatusType("finished");
};

const onChangeEBS = (e) => {
  const Data = JSON.parse(localStorage.getItem("Processor_Details"));
  const Selected_EBS = EBSStorageTypes.find(
    (ebs) => ebs.value === e.target.value
  );
  EBSSetSeletedOption(Selected_EBS);
  const EBS_Data = lodash.filter(Data, function (ins) {
    return ins.storage === Selected_EBS.label;
  });
  localStorage.setItem("EBS_Details", JSON.stringify(EBS_Data));
  // setShiftTopic();
};

const onFocusNetwork = () => {
  const Data = JSON.parse(localStorage.getItem("EBS_Details"));
  setStatusType("loading");
  const UniqueNetwork = lodash.uniqBy(Data, function (ins) {
    return ins.networkPerformance;
  });
  const NetworkType = UniqueNetwork.map((ins, i) => {
    return {
      value: i,
      label: ins.networkPerformance,
    };
  });
  setNetworkTypes(NetworkType);
  setStatusType("finished");
};

const onChangeNetwork = (e) => {
  const Data = JSON.parse(localStorage.getItem("EBS_Details"));
  const Selected_Network = NetworkTypes.find(
    (network) => network.value === e.target.value
  );
  NetworkSetSeletedOption(Selected_Network);
  const Network_Data = lodash.filter(Data, function (ins) {
    return ins.networkPerformance === Selected_Network.label;
  });
  localStorage.setItem("Network_Details", JSON.stringify(Network_Data));
  console.log(Network_Data);
  setNextStatus(false);
  // setShiftTopic();
};

const onNext = (e) => {
  e.preventDefault();
  if (
    EBSSelectedOption !== undefined &&
    ProcessorSelectedOption !== undefined &&
    NetworkSelectedOption !== undefined
  ) {
    const data = {
      processor: ProcessorSelectedOption,
      network: NetworkSelectedOption,
      storage: EBSSelectedOption,
    };
    localStorage.setItem("Config_Data", JSON.stringify(data));
    history.push("/Pods/Config/Recommendation");
  }
};

const onCancel = () => {
  history.push("/");
};

getStorageTypes = () => {
  const data = {
    location: "Asia Pacific (Osaka)",
    processor: "Intel",
  };
  const options = {
    url: "https://impxwqtym6.execute-api.us-east-1.amazonaws.com/DEV/instance-fetch-processor",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: JSON.stringify(data),
  };
  setEBSStorageTypes("hbhb");
  axios(options)
    .then((response) => {
      const data = JSON.parse(response.data.body);
      // setEBSStorageTypes(data);
      setloadingEBS("notloading");
    })
    .then((err) => console.log(err));
};

useEffect(() => {
  if (isProcessorSelected) {
    // getStorageTypes();
  }
}, [isProcessorSelected]);

// page 3 imp file

const getProcessorTypes = () => {
  const data = {
    location: "Asia Pacific (Osaka)",
  };
  const options = {
    url: "https://impxwqtym6.execute-api.us-east-1.amazonaws.com/DEV/instance-fetch-processor",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: JSON.stringify(data),
  };
  axios(options)
    .then((response) => {
      const data = JSON.parse(response.data.body);
      setProcessorTypes(data);
    })
    .catch((err) => console.log("error", err));
};

const onChangeProcessor = (e) => {
  const Selected_Processor = ProcessorTypes.find(
    (pro) => pro.value === e.target.value
  );
  ProcessorSetSeletedOption(Selected_Processor);
  setisProcessorSelected(true);
};

const getStorageTypes = () => {
  const data = {
    location: "Asia Pacific (Osaka)",
    processor: "Intel",
  };
  const options = {
    url: "https://impxwqtym6.execute-api.us-east-1.amazonaws.com/DEV/instance-fetch-storage",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: JSON.stringify(data),
  };

  axios(options)
    .then((response) => {
      const data = JSON.parse(response.data.body);
      setEBSStorageTypes(data);
    })
    .catch((err) => console.log("error", err));
};

const onChangeEBS = (e) => {
  const Selected_EBS = EBSStorageTypes.find(
    (ebs) => ebs.value === e.target.value
  );
  EBSSetSeletedOption(Selected_EBS);
  setisStorageSelected(true);
};

const getOSTypes = () => {
  const data = {
    location: "Asia Pacific (Singapore)",
    processor: "Intel",
    storage: "EBS only",
  };
  const options = {
    url: "https://impxwqtym6.execute-api.us-east-1.amazonaws.com/DEV/instance-fetch-os",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: JSON.stringify(data),
  };

  axios(options)
    .then((response) => {
      const data = JSON.parse(response.data.body);
      setOSTypes(data);
    })
    .catch((err) => console.log("error", err));
};

const onChangeOS = (e) => {
  const Selected_OS = OSTypes.find((os) => os.value === e.target.value);
  setOSSelectedOption(Selected_OS);
};

const getNetworkTypes = () => {
  const data = {
    location: "Asia Pacific (Singapore)",
    processor: "Intel",
    storage: "EBS only",
  };
  const options = {
    url: "https://impxwqtym6.execute-api.us-east-1.amazonaws.com/DEV/instance-fetch-os",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: JSON.stringify(data),
  };

  axios(options)
    .then((response) => {
      const data = JSON.parse(response.data.body);
      setOSTypes(data);
    })
    .catch((err) => console.log("error", err));
};

const onChangeOS = (e) => {
  const Selected_OS = OSTypes.find((os) => os.value === e.target.value);
  setOSSelectedOption(Selected_OS);
};
useEffect(() => {
  getProcessorTypes();
}, []);

useEffect(() => {
  getStorageTypes();
}, [isProcessorSelected]);

useEffect(() => {
  getOSTypes();
}, [isStorageSelected]);

useEffect(() => {
  getNetworkTypes();
}, [isStorageSelected]);
