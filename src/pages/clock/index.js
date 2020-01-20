import React, { PureComponent } from "react";
import "./index.scss";
export default class Clock extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {  
            date: new Date()
        };
    }
    componentDidMount() {
        this.timer = setInterval(() => this.setDate(), 1000)
    }
    setDate = () => {
        this.setState({
            date: new Date()
        })
    }
    componentWillUnmount() {
        console.log(1111)
        clearInterval(this.timer)
    }
    componentDidUpdate(prevProps, prevState, prevScrollHeight) {
    }
    render() {
        return (
            <div>
                <h3 className="redColor">{this.state.date.toLocaleTimeString()}</h3>
            </div>
        );
    }
}
