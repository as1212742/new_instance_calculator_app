/** @format */

import { Inline, Select } from "aws-northstar";
import Container from "aws-northstar/layouts/Container";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../Context/Provider/provider";
import Button from "aws-northstar/components/Button";
import { useHistory } from "react-router-dom";
import { setCookie } from "../../Helpers/helper";

const DropdownHeader = () => {
  const history = useHistory();
  const { DataState, SetSelectedRegion } = useContext(DataContext);
  const [Regions, setRegions] = useState([]);
  const [selectedOption, setSeletedOption] = useState();

  // set the selected location
  const Setlocation = () => {
    //sets your selected region either from cookie or directly
    const loc = DataState.selectedlocation;
    if (DataState.Region.region !== undefined && loc !== "") {
      const val = DataState.Region.region.find((reg) => reg.label === loc);
      setSeletedOption(val);
      SetSelectedRegion(val.label);
    }
  };

  useEffect(() => {
    //sets region array to loop through
    setRegions(DataState.Region.region);
    Setlocation();
  }, []);

  const onChange = (event) => {
    const val = Regions.find((reg) => reg.value === event.target.value);
    setCookie("location", val.label, 1);
    setSeletedOption(val);
    SetSelectedRegion(val.label);
  };

  const onClickHome = () => {
    history.push("/");
  };

  return (
    <Container headingVariant="h4" title="Select Region">
      <Inline>
        <Select
          placeholder="Select Region"
          options={DataState.Region.region}
          selectedOption={selectedOption}
          onChange={onChange}
          streach={true}
        />
        <Button onClick={onClickHome}>Home</Button>
      </Inline>
    </Container>
  );
};

export default DropdownHeader;
