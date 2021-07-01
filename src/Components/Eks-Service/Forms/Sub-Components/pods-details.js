/** @format */

import Form from "aws-northstar/components/Form";
import FormField from "aws-northstar/components/FormField";
import FormSection from "aws-northstar/components/FormSection";
import Input from "aws-northstar/components/Input";
import Select from "aws-northstar/components/Select";
import React, { useContext, useEffect, useState } from "react";
import DisplayRecommendation from "./Display/recommendation";
import "./pods-details.css";
import { DataContext } from "../../../../Context/Provider/provider";
import { Checkbox, ColumnLayout, Heading, Stack } from "aws-northstar";
import AlertInstance from "./Alerts/instance";
import InstancePodsCalculation from "./Show-Calculations/ondemand";
import Validation from "../Sub-Components/Alerts/validation";

const EC2_Details = () => {
  const [OperatingSystem, setOperatingSystem] = useState([]);
  const [SelectedOS, setSelectedOS] = useState();
  const { DataState, SetSelectedOSData, SetRecommendationDetails } =
    useContext(DataContext);
  const [Pods, setPods] = useState("");
  const [vCPU, setvCPU] = useState("");
  const [memory, setmemory] = useState("");
  const [GPU, setGPU] = useState("");
  const [Displaydata, setDisplaydata] = useState({});
  const [isDetailsRight, setisDetailsRight] = useState(1);
  const [maxInstancevCPU, setmaxInstancevCPU] = useState("");
  const [maxInstanceMemory, setmaxInstanceMemory] = useState("");
  const [onChangeCheckBox, setonChangeCheckBox] = useState(0);
  const [isValid, setisValid] = useState(1);

  // on page reload
  useEffect(() => {
    //on page reload set data to loop through
    setOperatingSystem(DataState.OperatingSystem);

    // set selected data as first of the list in first loop
    DataState.OperatingSystem !== undefined &&
      setSelectedOS(DataState.OperatingSystem[0]) &&
      SetSelectedOSData(DataState.OperatingSystem[0].label);
    setmemory(DataState.DefaultValue.memory);
    setvCPU(DataState.DefaultValue.vCPUs);
    setPods(DataState.DefaultValue.totalpods);
  }, []);

  // on change of operating system selection
  useEffect(() => {
    // set selected data as first of the list in first loop
    if (
      DataState.OperatingSystem !== undefined &&
      DataState.selectedos !== undefined
    ) {
      const val = DataState.OperatingSystem.find(
        (reg) => reg.os === DataState.selectedos
      );
      setSelectedOS(val);
    }
  }, [DataState.selectedos]);

  //calculation without GPU
  const CalculationOnDemandLogic = (data) => {
    let pods_est = Number.MAX_SAFE_INTEGER;
    let price_est = Number.MAX_SAFE_INTEGER;
    let result = {};

    if (onChangeCheckBox) {
      if (maxInstancevCPU !== "" && maxInstancevCPU) {
        data = data.filter(
          (res) => Number(res.values.vcpu) <= Number(maxInstancevCPU)
        );
      }

      if (maxInstanceMemory !== "") {
        data = data.filter(
          (res) =>
            Number(res.values.memory.replace(" GiB", "")) <=
            Number(maxInstanceMemory)
        );
      }
    }

    data.map((res) => {
      if (
        Number(vCPU) < 0 ||
        Number(memory) < 0 ||
        Number(Pods) < 0 ||
        Number(GPU) < 0 ||
        !(Number.isInteger(Number(Pods)) && Number(Pods) > 0)
      )
        return;

      //calculation when GPU included
      if (GPU !== "" && "gpu" in res.values && Number(GPU) !== 0) {
        const max_eni =
          (Number(res.values.eni_ip) - 1) * Number(res.values.eni_number) + 2;
        const max_cpu = Math.floor(Number(res.values.vcpu) / Number(vCPU));
        const filt_memory = res.values.memory.replace(" GiB", "");
        const max_memory = Math.floor(Number(filt_memory) / Number(memory));
        const max_gpu = Math.floor(Number(res.values.gpu) / Number(GPU));
        const pods_possible = Math.min(max_eni, max_cpu, max_memory, max_gpu);
        const total_instance_needed = Math.ceil(
          Number(Pods) / Number(pods_possible)
        );

        if (pods_possible === 0) return;
        const total_cost_of_instance = parseFloat(
          parseFloat(total_instance_needed) * parseFloat(res.values.price)
        );

        // gpu added in calculation

        if (
          total_instance_needed >= 3 &&
          pods_est > total_instance_needed &&
          price_est > total_cost_of_instance
        ) {
          pods_est = total_instance_needed;
          price_est = total_cost_of_instance;
          result = {
            instanceName: res.values.instanceType,
            network: res.values.networkPerformance,
            physicalProcessor: res.values.physicalProcessor,
            GPU: res.values.gpu,
            podsperinstance: pods_possible,
            totalinstancerequired: total_instance_needed,
            totalcostforinstance: total_cost_of_instance,
            price: res.values.price,
            ins_mem: filt_memory,
            ins_vcpu: res.values.vcpu,
            max_eni,
            max_cpu,
            max_memory,
            max_gpu,
            memory,
            vCPU,
            Pods,
            podsgpu: GPU,
            eni_ip: res.values.eni_ip,
            eni_no: res.values.eni_number,
            service: "eks",
            region: DataState.selectedlocation,
            os: DataState.selectedos,
          };
        }
      }

      if ((GPU === "" || Number(GPU) === 0) && !("gpu" in res.values)) {
        const max_eni =
          (Number(res.values.eni_ip) - 1) * Number(res.values.eni_number) + 2;
        const max_cpu = Math.floor(Number(res.values.vcpu) / Number(vCPU));
        const filt_memory = res.values.memory.replace(" GiB", "");
        const max_memory = Math.floor(Number(filt_memory) / Number(memory));
        const pods_possible = Math.min(max_eni, max_cpu, max_memory);
        const total_instance_needed = Math.ceil(
          Number(Pods) / Number(pods_possible)
        );

        if (pods_possible === 0) return;

        const total_cost_of_instance = parseFloat(
          parseFloat(total_instance_needed) * parseFloat(res.values.price)
        );

        // gpu not added
        if (
          total_instance_needed >= 3 &&
          pods_est > total_instance_needed &&
          price_est > total_cost_of_instance
        ) {
          pods_est = total_instance_needed;
          price_est = total_cost_of_instance;
          result = {
            instanceName: res.values.instanceType,
            network: res.values.networkPerformance,
            physicalProcessor: res.values.physicalProcessor,
            GPU: "NA",
            podsperinstance: pods_possible,
            totalinstancerequired: total_instance_needed,
            totalcostforinstance: total_cost_of_instance,
            price: res.values.price,
            ins_mem: filt_memory,
            ins_vcpu: res.values.vcpu,
            max_eni,
            max_cpu,
            max_memory,
            vCPU,
            Pods,
            max_gpu: "NA",
            memory,
            podsgpu: GPU,
            eni_ip: res.values.eni_ip,
            eni_no: res.values.eni_number,
            service: "eks",
            region: DataState.selectedlocation,
            os: DataState.selectedos,
          };
        }
      }
    });
    setDisplaydata(result);
  };

  // core calculation section (mostly conditions put here)
  const Calculation = () => {
    if (Pods === "" || vCPU === "" || memory === "") {
      setisDetailsRight(0);
      setDisplaydata({});
      return;
    } else {
      setisDetailsRight(1);
    }

    const data =
      DataState.instancedata != undefined
        ? DataState.instancedata.ondemand
        : [];
    data !== undefined && CalculationOnDemandLogic(data);
  };

  useEffect(() => {
    Calculation();
  }, [
    Pods,
    vCPU,
    memory,
    GPU,
    DataState.instancedata,
    maxInstancevCPU,
    maxInstanceMemory,
    onChangeCheckBox,
  ]);

  useEffect(() => {
    SetRecommendationDetails(Displaydata);
  }, [Displaydata]);

  const onChangeOS = (event) => {
    const val = OperatingSystem.find((os) => os.value === event.target.value);
    setSelectedOS(val);
    SetSelectedOSData(val.os);
  };

  // regex validation
  const mem_cpu_valid = (e) => {
    const regex = new RegExp("^[+]?[0-9]{1,9}(?:.[0-9]{1,2})?$");
    if (e !== "" && regex.test(e) === false) {
      setisValid(0);
    } else {
      setisValid(1);
    }
  };

  // regex validation
  const pods_valid = (e) => {
    const num = Number.isInteger(Number(e)) && e > 0;

    if (e !== "" && num === false) {
      setisValid(0);
    } else {
      setisValid(1);
    }
  };

  const OnChangePods = (e) => {
    setPods(e);
    pods_valid(e);
  };

  const OnChangevCPU = (e) => {
    setvCPU(e);
    mem_cpu_valid(e);
  };

  const OnChangeMemory = (e) => {
    setmemory(e);
    mem_cpu_valid(e);
  };

  const OnChangeGPU = (e) => {
    setGPU(e);
    mem_cpu_valid(e);
  };

  const OnChangeMaxInstancevCPU = (e) => {
    setmaxInstancevCPU(e);
  };

  const OnChangeMaxInstanceMemory = (e) => {
    setmaxInstanceMemory(e);
  };

  return (
    <Form className="Pods_Form_Section">
      <FormSection header="Pods specifications">
        <FormField
          label="Operating system"
          description="Choose which operating system you'd like to run Amazon EC2 instances on."
          controlId="formFieldId3"
          stretch={true}
        >
          <Select
            placeholder="Choose an option"
            controlId="formFieldId3"
            options={OperatingSystem}
            selectedOption={SelectedOS}
            onChange={onChangeOS}
          />
        </FormField>
        {isDetailsRight ? isValid ? null : <Validation /> : <AlertInstance />}

        <Stack>
          <ColumnLayout>
            <FormField
              label="Total Pods"
              description="Enter to Pod Requirement"
              hintText="Input values e.g. 10 not contains decimal (e.g. 10.25)"
              controlId="formFieldId1"
              stretch={true}
            >
              <Input
                type="text"
                controlId="formFieldId2"
                autocomplete={false}
                disableBrowserAutocorrect={true}
                value={Pods}
                onChange={OnChangePods}
              />
            </FormField>

            <FormField
              label="vCPUs"
              description="Enter Pod vCPUs Requirement"
              hintText="Input values e.g. 10 or 0.25 "
              controlId="formFieldId3"
              stretch={true}
            >
              <Input
                type="text"
                controlId="formFieldId4"
                autocomplete={false}
                disableBrowserAutocorrect={true}
                value={vCPU}
                onChange={OnChangevCPU}
              />
            </FormField>
          </ColumnLayout>
          <ColumnLayout>
            <FormField
              label="Memory(GiB)"
              description="Enter Pod Memory Requirement"
              hintText="Input values e.g. 10 or 0.5 GiB"
              controlId="formFieldId5"
              stretch={true}
            >
              <Input
                type="text"
                controlId="formFieldId6"
                autocomplete={false}
                disableBrowserAutocorrect={true}
                value={memory}
                onChange={OnChangeMemory}
              />
            </FormField>
            <FormField
              label="GPU"
              description="Enter GPU Requirement (Optional)"
              hintText="Input values e.g. 10 not contains decimal (e.g. 10.25)"
              controlId="formFieldId7"
              stretch={true}
            >
              <Input
                type="text"
                controlId="formFieldId8"
                autocomplete={false}
                disableBrowserAutocorrect={true}
                value={GPU}
                onChange={OnChangeGPU}
              />
            </FormField>
          </ColumnLayout>
        </Stack>
        <br />
        <Checkbox onChange={() => setonChangeCheckBox(!onChangeCheckBox)}>
          Advanced Options
        </Checkbox>

        {onChangeCheckBox ? (
          <Stack>
            <Heading variant="h3">Maximum Instance Size Configuration</Heading>
            <ColumnLayout>
              <FormField label="vCPUs" controlId="formFieldId1" stretch={true}>
                <Input
                  type="text"
                  controlId="formFieldId1"
                  autocomplete={false}
                  disableBrowserAutocorrect={true}
                  value={maxInstancevCPU}
                  onChange={OnChangeMaxInstancevCPU}
                />
              </FormField>
              <FormField
                label="Memory(GiB)"
                controlId="formFieldId1"
                stretch={true}
              >
                <Input
                  type="text"
                  controlId="formFieldId1"
                  autocomplete={false}
                  disableBrowserAutocorrect={true}
                  value={maxInstanceMemory}
                  onChange={OnChangeMaxInstanceMemory}
                />
              </FormField>
            </ColumnLayout>
            <Heading variant="h5">
              Recommendation of Instance is given by considering Instances with
              lesser vCPU and Memory than entered{" "}
            </Heading>
          </Stack>
        ) : null}

        <DisplayRecommendation />
        <InstancePodsCalculation />
      </FormSection>
    </Form>
  );
};

export default EC2_Details;
