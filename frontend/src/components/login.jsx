import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { auth } from "../actions"

class Login extends Component {
  state = {
    username: " ",
    password: " "
  }

  onSubmit = e => {

    e.preventDefault()
    this.props.login(this.state.username, this.state.password)
  }

  render() {
    console.log(this)
    return (
      <form onSubmit={this.onSubmit}>
        <fieldset>
          <legend>Login</legend>
          {this.props.errors.length > 0 && (
            <ul>{
              this.props.errors.map(error => (
                <li key={error.field}>{error.message}</li>
              ))}
            </ul>
          )}
          <div className="username-div">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" onChange={e => this.setState({ username: e.target.value })} />
          </div>
          <div className="password-div">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={e => this.setState({ password: e.target.value })} />
          </div>
          <button type="submit">Login</button>
          <p>Don't have an account? <Link to="/register">Register</Link> </p>
        </fieldset>
      </form>
    )
  }
}

const mapStateToProps = state => {
  let errors = []
  if (state.auth.errors) {
    errors = Object.keys(state.auth.errors).map(field => {
      return { field, message: state.auth.errors[field] }
    })
  }
  return {
    errors,
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) => {
      return dispatch(auth.login(username, password))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)