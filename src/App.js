/** @format */

import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { DataProvider } from "./Context/Provider/provider";
import Home from "./Components/Home/homepage";
import Routes from "./Routes/index";

const Main = () => {
  return (
    <DataProvider>
      <BrowserRouter>
        <Home>
          <Switch>{Routes}</Switch>
        </Home>
      </BrowserRouter>
    </DataProvider>
  );
};

export default Main;
