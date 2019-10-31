import React, { Component } from 'react';
import "./BlackW.scss";
class BlackW extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 2],
        [0, 0, 0, 0, 0, 0, 2, 1]
      ]
    };
  }
  dom_span = (type, key, func) => {
    return <span
      className={
        `${type === 0 ? "blackW_dom_span" :
          type === 1 ? "blackW_dom_span_b" :
            "blackW_dom_span_w"}`
      }
      key={key}
      onClick={func}
      >
      {type !== 0 && 
      <span
        className={type === 1 ? "blackW_dom_span_b_circle" :
          "blackW_dom_span_w_circle"}></span>}
    </span>
  }
  addChild = (x, y, j,canMove) => {
    const { map } = this.state;
    while (--x >= 0) {
      if (map[y][x] === 2) {
        canMove = true
      } else if (map[y][x] === 1) {
        break
      } else if (map[y][x] === 0) {
        canMove = false
        break
      }
    }
    while (canMove && ++x <= j) {
      map[y][x] = 1;
      this.setState({
        map
      })
    }
  }
  dr_bg = () => {
    const { map } = this.state;
    let children = [];
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        let type = map[i][j], 
          [x,y] = [j, i];
        children.push(this.dom_span(type, `${i}:${j}`, () => this.addChild(x, y, j, false)));

      }
    }
    return children
  }
  render() {
    return (
      <div className="BlackW">
        {this.dr_bg()}
      </div>
    );
  }
}

export default BlackW;