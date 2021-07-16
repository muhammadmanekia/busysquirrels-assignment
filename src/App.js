import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Account from "./components/Account";
import ChangePassword from "./components/ChangePassword";
import { Accounts } from "./components/Accounts";

function App() {
  return (
    <div className="App">
      <Accounts>
        <Router>
          <Switch>
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} />
            <Route path="/account" render={(props) => <Account {...props} />} />
            <Route path="/changePassword" component={ChangePassword} />
            <Route path="*" exact component={Signin} />
          </Switch>
        </Router>
      </Accounts>
    </div>
  );
}

export default App;
