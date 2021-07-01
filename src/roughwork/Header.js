/** @format */

import React, { useContext } from "react";

import KeyValuePair from "aws-northstar/components/KeyValuePair";
import Container from "aws-northstar/layouts/Container";
import ColumnLayout, { Column } from "aws-northstar/layouts/ColumnLayout";
import Stack from "aws-northstar/layouts/Stack";
import { DataContext } from "../context/provider/Provider";

const Header = () => {
  const { DataState } = useContext(DataContext);

  return (
    <>
      {DataState.Table_Select.map((row) => {
        <h1>{row.id}</h1>;
      })}
    </>
  );
};

export default React.memo(Header);
