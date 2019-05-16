import React, { Component } from 'react';
import './App.css';
import Clock from "./pages/clock";
import CarouselTexts from "./pages/carouselTexts";
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
      </div>
    );
  }
}

export default App;
