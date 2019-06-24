import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import Clock from "../pages/clock";
import Click from "../pages/clickMe";
import CarouselTexts from "../pages/carouselTexts";

const Route1 = ({match}) => {
  console.log(match)
  return <h1>id:{match.params.id}</h1>
}
const Route2 = () => {
  return <h1>22222</h1>
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
      <div className="App">
        <h1>Hello Front-Koala</h1>
        <Clock />
        <CarouselTexts />
        
        <Router>
          <ul>
            <li>
              <Link to={"/route1"}>route1</Link>
            </li>
            <li>
              <Link to={"/route2"}>route2</Link>
            </li>
            <li>
              <Link to={"/Click"}>Click</Link>
            </li>
          </ul>
          <Route path={"/:id"} component={Route1} />
          <Route path={"/route2"} component={Route2} />
          <Route path={"/Click"} component={Click} />
        </Router>
      </div>
    );
  }
}

export default App;
