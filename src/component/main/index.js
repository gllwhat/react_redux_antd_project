import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import House from "../../pages/house/index";
import Shopping from "../../pages/shopping/index";

const Main = ({}) => {
  return (
    <div className="main">
      <Switch>
        <Route path="/house" component={House} />
        <Route path="/shopping" component={Shopping} />
      </Switch>
    </div>
  );
};

export default Main;
