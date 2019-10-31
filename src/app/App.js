import React, { Component } from 'react';
import { Layout, Menu, Icon } from "antd";
import { Link } from "react-router-dom";

import "./App.css";
import './App.less';
import Main from "../component/main/index"
// import Clock from "../pages/clock";
// import Click from "../pages/clickMe";
// import CarouselTexts from "../pages/carouselTexts";
// import BlackW from "../pages/20190804";
const { Header, Sider, Content } = Layout;

const Route1 = ({match}) => {
  console.log(match)
  return <h1>id:{match.params.id}</h1>
}
const Route2 = () => {
  return <h1>22222</h1>
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "datas",
      collapsed: false
    };
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  render() {
    return (
      <div className="App">
        <Layout>
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div className="logo" />
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["houseInfo"]}
            >
              <Menu.Item key="houseInfo">
                <Link to="/house">房屋信息</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: "#fff", padding: 0 }}>
              <Icon
                className="trigger"
                type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                onClick={this.toggle}
              />
            </Header>
            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                background: "#fff",
                minHeight: 280
              }}
            >
              <Main />
            </Content>
          </Layout>
        </Layout>
        {/* <h1>Hello Front-Koala</h1>
        <div className="carTexts">
          
        </div>
        <Clock />
        <BlackW />

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
        </Router> */}
      </div>
    );
  }
}

export default App;
