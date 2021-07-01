/** @format */

import Table from "aws-northstar/components/Table";
import StatusIndicator from "aws-northstar/components/StatusIndicator";
import { DataContext } from "../context/provider/Provider";
import { useContext } from "react";
import React from "react";

const Display_table = () => {
  const { DataState } = useContext(DataContext);
  const columnDefinitions = [
    {
      id: "id",
      width: 200,
      Header: "Id",
      accessor: "id",
    },
    {
      id: "name",
      width: 200,
      Header: "Name",
      accessor: "name",
    },
    {
      id: "status",
      width: 200,
      Header: "Status",
      accessor: "status",
    },
  ];
  return (
    <Table
      onSelectionChange={() => {}}
      tableTitle="Basic Table"
      columnDefinitions={columnDefinitions}
      items={DataState.Table_Select}
      disableGroupBy={true}
      disableSettings={true}
      disablePagination={true}
      disableFilters={true}
      disableRowSelect={true}
      disableSortBy={true}
    />
  );
};

export default Display_table;
