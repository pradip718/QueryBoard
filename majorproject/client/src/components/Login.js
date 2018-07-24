import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';


import './Login.css';

class Login extends Component {

render() {
  
    return (
      <div class="container">
        <form class="form-signin" action="/login" method="POST">

          <h2 class="form-signin-heading">Please sign in</h2>
          <label for="inputEmail" class="sr-only">Email address</label>
          <input type="email" class="form-control" placeholder="Email address" name="username" />
          <label for="inputPassword" class="sr-only">Password</label>
          <input type="password" class="form-control" placeholder="Password" name="password" />
          <button class="btn btn-lg btn-primary btn-block" type="submit">Login</button>
          <p>
            Not a member? <span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
            <Link to ="/register">
              Register here 
            </Link> 
          </p>

        </form>
      </div>
    );
  }
}
export default Login;