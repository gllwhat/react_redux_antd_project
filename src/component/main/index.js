import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import House from "../../pages/house/index";

const Main = ({}) => {
  return <div className="main">
    <Switch>
      <Route path="/house" component={House}/>
    </Switch>
  </div>;
};

export default Main;
