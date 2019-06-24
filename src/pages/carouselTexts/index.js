import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import "./index.css";
export default class SnapshotSample extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    addMsg = () => {
        this.setState(prev => ({
            data: [`msg: ${prev.data.length}`, ...prev.data]
        }))
    }
    componentDidMount = () => {
        for(let i = 0; i < 20; i ++) {
            this.addMsg()
        }
        this.timer = window.setInterval(() => {
            if (this.state.data.length > 100) {
                window.clearInterval(this.timer)
                return
            }
            this.addMsg()
        }, 1000);
        
    }
    getSnapshotBeforeUpdate = () => {
        return this.refs.box.scrollHeight
    }
    componentDidUpdate = (prevProps, prevState, prevScrollHeight) => {
        // console.log('this.refs.box.scrollTop', this.refs.box.scrollTop)
        // console.log('this.refs.box.scrollHeight', this.refs.box.scrollHeight)
        // console.log('prevScrollHeight', prevScrollHeight)
        this.refs.box.scrollTop = this.refs.box.scrollTop + this.refs.box.scrollHeight - prevScrollHeight
    }
    componentWillUnmount() {
        window.clearInterval(this.timer)
    }
    render() {
        return <div className="snapshot-sample" ref="box">
            {this.state.data.map((item, index) => {
                return <p key={`${index}`}>{item}</p>
            })}
        </div>
    }






    // state = {
    //     messages: [],
    // };

    // handleNewMessage() {
    //     this.setState(prev => ({
    //         messages: [`msg ${prev.messages.length}`, ...prev.messages],
    //     }));
    // }

    // componentDidMount() {
    //     for (let i = 0; i < 20; i++) this.handleNewMessage();
    //     this.interval = window.setInterval(() => {
    //         if (this.state.messages.length > 200) {
    //             window.clearInterval(this.interval);
    //             return;
    //         }
    //         this.handleNewMessage();
    //     }, 1000);
    // }
    // componentWillUnmount() {
    //     window.clearInterval(this.interval);
    // }

    // getSnapshotBeforeUpdate() {
    //     return this.rootNode.scrollHeight;
    // }

    // componentDidUpdate(prevProps, prevState, prevScrollHeight) {
    //     const scrollTop = this.rootNode.scrollTop;
    //   if (scrollTop < 5) return;
    //   this.rootNode.scrollTop =
    //     scrollTop + (this.rootNode.scrollHeight - prevScrollHeight);
    // }

    // render() {
    //     return (
    //         <div className="snapshot-sample" ref={n => (this.rootNode = n)}>
    //             {this.state.messages.map(msg => (
    //                 <div>{msg}</div>
    //             ))}
    //         </div>
    //     );
    // }
}
