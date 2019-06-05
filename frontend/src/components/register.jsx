import React, { Component } from "react"
import { connect } from "react-redux"

import { Link, Redirect } from "react-router-dom"

import { auth } from "../actions"

class Register extends Component {
  state = {
    username: " ",
    password: " "
  }


  onSubmit = (e) => {
    e.preventDefault()
    this.props.register(this.state.username, this.state.password)
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />
    }

    return (
      <form onSubmit={this.onSubmit}>
        <fieldset>
          <legend>Register</legend>
          {this.props.errors.length > 0 && (
            this.props.errors.map(error => {
              return (
                <li key={error.field}>{error.message}</li>
              )
            })
          )}
          <div className="username-div">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" onChange={e => this.setState({ username: e.target.value })} />
          </div>

          <div className="password-div">
            <label htmlFor="password">Password</label>
            <input type="text" id="password" onChange={e => this.setState({ password: e.target.value })} />
          </div>
          <button type="submit">Register</button>
          <p>Alreday have an account? <Link to="/login">Login</Link></p>
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
    isAuthenticated: state.auth.isAuthenticated
  }
}

const mapDispatchToProps = dispatch => {
  return {
    register: (username, password) => {
      return dispatch(auth.register(username, password))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)

