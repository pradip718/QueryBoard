import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Login.css';
//import Google from './GoogleLogin'

class Create extends Component {

  render() {
  
    return (
      <div class="container">
        <form class="form-signin" action="/register" method="POST">
          <h2 class="form-signin-heading">Register</h2>

          <label for="inputEmail" class="sr-only">Username</label>
          <input type="text" class="form-control" placeholder="Username" name="username1" required/>
          

          <label for="inputEmail" class="sr-only">Email address</label>
          <input type="email" class="form-control" placeholder="Email address" name="username"/>
          
          <label for="inputPassword" class="sr-only">Password</label>
          <input type="password" class="form-control" placeholder="Password" name="password"/>
          <button class="btn btn-lg btn-primary btn-block" type="submit">Register</button>
           
            <a href="/login" >Go Back</a>
                    
        </form>
        
      </div>
    );
  }
}

export default Create;
