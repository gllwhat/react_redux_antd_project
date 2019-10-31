import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import Clock from "./pages/clock";
import CarouselTexts from "./pages/carouselTexts";
const Route1 = () => {
  return <div>11111</div>
}
const Route2 = () => {
  return <div>22222</div>
}
const Route3 = () => {
  return <div>33333</div>
}
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      data: 'datas'
    }
  }
  render() {
    return (
      <div>
        {/* <div className="App">
          <h1>Hello Front-Koala</h1>
          <Clock />
          <CarouselTexts />
        </div> */}
        <ul>
          <li>
            <Link to={"/route1"}>route1</Link>
          </li>
          <li>
            <Link to={"/route2"}>route2</Link>
          </li>
          <li>
            <Link to={"/route3"}>route3</Link>
          </li>
        </ul>
        <Router>
          <Route path={"/route1"} Component={Route1} />
          <Route path={"/route2"} Component={Route2} />
          <Route path={"/route3"} Component={Route3} />
        </Router>
      </div>
    );
  }
}

export default App;
