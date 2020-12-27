import React, { Component } from "react";
import { Route, Router,  Switch } from "react-router-dom";
import { history } from "./redux";
import { connect } from "react-redux";
import LogIn from "./containers/LogIn";
import Adminpage from "./containers/Adminpage";
import { PrivateRoute } from "./components/PrivateRoute";
import { ToastContainer,  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
 


  render() {
    return (
      <Router history={history}>
        <ToastContainer position="top-center"/>
     


        <Switch>
        <Route path="/signin" exact component={LogIn} />
       <PrivateRoute path="/" component={Adminpage} />

        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    loginReducer: state.loginReducer
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
