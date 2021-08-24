import React, { Component } from "react";
import { History } from "./utils/History"
import './App.css';
import { Router, Route, Switch } from "react-router-dom";
import Login from './Authentication/Login'
import Theme from './Theme/Theme'
import TopBar from "./common/TopBar";
import SquashDashboard from "./SquashDashboard/index";
import SignUp from "./Authentication/Signup";
import GameDashboard from './GameDashboard/index'

const hide = [
  "/register",
  "/login",
  "/"
];

class App extends Component {
  constructor(props) {
    super(props);
  }

  checkLocation(pathName) {
    if (hide.includes(pathName)|| localStorage.getItem("token") === "") {
      return false;
    } else {
      return true;
    }
  }
  
  render() {
    return (
      <div >
        <Router history={History}>
          <Route
            path="/"
            exact
            render={props => (
              <Login login={name => this.login(name)}  {...props} />
            )}
          />
          <Route
                path="/"
                render={props => {
                  if (this.checkLocation(props.location.pathname))
                    return (
                      <React.Fragment>
                        <TopBar {...props} ></TopBar>
                      </React.Fragment>
                    );
                }}
              ></Route>
          <Route path="/login" exact render={(props)=>(<Login   {...props}/>)} />
          <Route path="/register" exact component={SignUp}/>
            <Theme>
                <Route path="/dashboard" exact component={SquashDashboard}/>
                <Route path="/game-dashboard" exact component={GameDashboard} />
            </Theme>                
          {/* <Route path="/dashboard" render={(props) => (<DashBoard {...props} handleHeaderData={this.handleHeaderData} />)} /> */}
        </Router>
      </div>
    )
  }

}

export default App;
