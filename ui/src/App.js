import React, { Component } from "react";
import List from "./clientList";
import Tunnel from "./Tunnel";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <h1 className="text-center">Dashboard</h1>
          <Switch>
            <Route exact path="/" component={List} />
            <Route exact path="/Tunnel" component={Tunnel} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
