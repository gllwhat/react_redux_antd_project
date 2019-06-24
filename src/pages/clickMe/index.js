import React, { PureComponent } from "react";
import "./index.scss";

export default class ClickMe extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            top: 0,
            left: 0,
            showMe: false,
            clickNum: 0,
            background: ["red","blue","#000","pink","green"],
            bgNum: 0
        }
    }
    setNum = () => {
        let num = this.state.clickNum;
        let bgNum = Math.floor(Math.random() / 2 * 10)
        let random = Math.random()
        let ClickMeBoxWidth = this.refs.ClickMeBox.offsetWidth;
        console.log("toClickMe ClickMeBoxWidth", ClickMeBoxWidth)
        let top = Math.floor(300 * random),
            left = Math.floor(ClickMeBoxWidth * random);
        if (top >= 270) {
            top = 270
        }
        if (left >= ClickMeBoxWidth - 60) {
            left = ClickMeBoxWidth - 60
        }
        if (num + 1 === 5) {
            this.setState({
                showMe: false,
                clickNum:0
            })
            return
        }
        this.setState({
            clickNum: ++num,
            bgNum: bgNum,
            top: top,
            left: left
        })
    }
    toClickMe = () => {
        this.setNum()
        this.setState({
            showMe: true
        })
        
    }
    clickMe = () => {
        this.setNum()
    }
    render(){
        console.log("render this.state",this.state)
        return <div className="ClickMeBox" ref="ClickMeBox">
            <div className="clickMeRunBox">
                <button 
                className="toClickMe" 
                onClick={this.toClickMe} 
                style={{
                    display: this.state.showMe ? "none" : "block"
                }}>点我开始</button>
                <div className="clickMe"
                onClick={this.clickMe}
                style={{
                    display: this.state.showMe ? "block" : "none",
                    background: this.state.background[this.state.bgNum],
                    top: this.state.top,
                    left: this.state.left
                }}>
                    <span className="clickMeText">你瞅啥</span>
                </div>
            </div>
        </div>
    }
}