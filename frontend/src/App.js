import React, { Component } from "react";
import { Route, Switch, BrowserRouter as Router, Redirect } from "react-router-dom";

import Notes from "./components/notes";
import NotFound from "./components/NotFound";
import Login from "./components/login"
import Register from "./components/register"

import { Provider, connect } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import Reducer from "./reducers";
import { auth } from "./actions"
import "./App.css";

const store = createStore(Reducer, applyMiddleware(thunk));

class RootContainerComponent extends Component {
  componentDidMount() {
    this.props.loadUser()
    console.log(this)
  }

  PrivateRoute = ({ component: ChildComponent, ...rest }) => {
    return <Route {...rest} render={props => {
      if (this.props.auth.isLoading) {
        return <em>Loading....</em>
      }
      else if (!this.props.auth.isAuthenticated) {
        return <Redirect to="/login" />
      }
      else {
        return <ChildComponent {...this.props} />
      }
    }} />
  }

  render() {
    let { PrivateRoute } = this
    return (
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Notes} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    )
  }

}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadUser: () => {
      return dispatch(auth.loadUser())
    }
  }
}

let RootContainer = connect(mapStateToProps, mapDispatchToProps)(RootContainerComponent)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <RootContainer />
        </div>
      </Provider>
    );
  }
}

export default App;
