import * as react from 'react';
import "./BlackW.scss";
class BlackW extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      dom_span: (key) => {
        return <span className="blackW_dom_span" key={key}></span>
      },
      dom_span_type: (type, key) => {
        return <span className={`${type === 1 ? "blackW_dom_span_w" : "blackW_dom_span_y"}`} key={key}>
          <span className="blackW_dom_span_w_circle"></span>
        </span>
      },
      map: [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 2, 0, 0, 0],
        [0, 0, 0, 2, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ]
    };
  }
  dr_bg = () => {
    const { dom_span, dom_span_type } = this.state;
    let children = [];
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        // if (i === 4) {
        //   if (j === 4) {
        //     children.push(dom_span_type("w", `${i}:${j}`))
        //   }
        //   if (j === 5) {
        //     children.push(dom_span_type("b", `${i}:${j}`))
        //   }
        // } else if (i === 5) {
        //   if (j === 4) {
        //     children.push(dom_span_type("w", `${i}:${j}`))
        //   }
        //   if (j === 5) {
        //     children.push(dom_span_type("b", `${i}:${j}`))
        //   }
        // } else {
          children.push(dom_span(`${i}:${j}`))
        // }
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