import React from "react";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import ProtectedRoute from "./components/login/protectedRoute";
import ProductIndex from "./components/Product/ProductIndex";
import ProductInsert from "./components/Product/ProductInsert";
import Navbar from "./components/Navbar";
import Default from "./components/style/Default";

function App(props) {
  const { isAuthenticated, isVerifying } = props;
  return ( 
    <div><br/><br/>
    <React.Fragment>
      <Navbar/>
        <Switch>
          <ProtectedRoute
            path="/cart"
            component={ProductInsert}
            isVerifying={isVerifying}
            isAuthenticated={isAuthenticated}
          />
          <Route exact path="/" component={ProductIndex} /> 
          <Route component={Default} />
        </Switch>
      </React.Fragment>
      </div>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying
  };
}

export default connect(mapStateToProps)(App);
