/** @format */

import Table from "aws-northstar/components/Table";
import Button from "aws-northstar/components/Button";
import Inline from "aws-northstar/layouts/Inline";
import React, { useCallback, useContext, useState } from "react";
import { Input } from "reactstrap";
// import HeaderTable from "./Header_Table";
import { DataContext } from "../../../context/provider/Provider";

const Test = () => {
  const Data = JSON.parse(localStorage.getItem("Network_Details"));
  const PodsData = JSON.parse(localStorage.getItem("Pods_Details"));

  const [visible, setVisible] = useState(false);
  const [Rows, setRowslist] = useState([]);
  const [cell, setcell] = useState();
  const [ids, setids] = useState();
  const { DataState, SetTest, SetTableSelection } = useContext(DataContext);

  const submit = (e) => {
    const data = {
      id: e.target.id,
      value: e.target.value,
    };
    SetTest(data);
  };

  const handleSelection = useCallback(
    (rows) => {
      if (
        rows.length &&
        JSON.stringify(rows) !== JSON.stringify(DataState.Table_Select)
      ) {
        SetTableSelection(rows);
      }
    },
    [DataState.Table_Select]
  );

  const columnDefinitions = [
    {
      id: "instanceType",
      width: 200,
      Header: "Instance Type",
      accessor: "instanceType",
    },
    {
      id: "InstanceTotal",
      width: 200,
      Header: "Instance Needed(Pods)",
      accessor: (row) => {
        const temp_row = row.memory.replace(" GiB", "");
        const temp_memory = Math.ceil(temp_row / PodsData.Memory);
        const temp_cpu = Math.ceil(row.vcpu / PodsData.CPU);
        const result = PodsData.Pods / Math.min(temp_memory, temp_cpu);
        return Math.ceil(result);
      },
    },
    {
      id: "accounts",
      width: 200,
      Header: "# Accounts",
      accessor: (row) => (row.accounts ? row.accounts.length : 0),
    },
    {
      id: "status",
      width: 200,
      Header: "status",
      accessor: "status",
    },
    {
      id: "xyz",
      width: 200,
      Header: "Status",
      accessor: "status",
      Cell: ({ row }) => {
        if (row && row.original) {
          return (
            <Input
              id={row.original.id}
              name="username"
              onBlur={(e) => submit(e)}
              onKeyPress={(e) => {
                if (e.key === "Enter") submit(e);
              }}
              required
            />
          );
        }
        return null;
      },
    },
  ];

  const tableActions = (
    <Inline>
      <Button onClick={() => SetTableSelection([])}>Clear</Button>
    </Inline>
  );

  return (
    <>
      <Table
        actionGroup={tableActions}
        tableTitle="Multi Select Table"
        columnDefinitions={columnDefinitions}
        items={Data}
        sortBy={[
          {
            id: "name",
            desc: true,
          },
        ]}
      />
    </>
  );
};

export default Test;
