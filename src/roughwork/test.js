/** @format */

import Table from "aws-northstar/components/Table";
import Button from "aws-northstar/components/Button";
import Inline from "aws-northstar/layouts/Inline";
import React, { useCallback, useContext, useState } from "react";
import { Input } from "reactstrap";
import Display_table from "./display_table";
import { DataContext } from "../context/provider/Provider";

const Test = () => {
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
          const id = row.original.id;
          return (
            <Input
              id={id}
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
      <Display_table />
      <Table
        actionGroup={tableActions}
        tableTitle="Multi Select Table"
        columnDefinitions={columnDefinitions}
        items={DataState.Test}
        onSelectionChange={(row) => {
          handleSelection(row);
        }}
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
