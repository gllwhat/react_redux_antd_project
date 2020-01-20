import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import House from "../../pages/house/index";
import Clock from "../../pages/clock/index";
import Shopping from "../../pages/shopping/index";
import Spending from "../../pages/spending/index";

const Main = ({}) => {
  return (
    <div className="main">
      <Switch>
        <Route path="/router1" component={Clock} />
        <Route path="/house" component={House} />
        <Route path="/shopping" component={Shopping} />
        <Route path="/spending" component={Spending} />
      </Switch>
    </div>
  );
};

export default Main;
