import React, { Component } from 'react';

import logo from './logo.svg';
import ReactDOM from 'react-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/home/Home';
import Expert from './components/home/Expert';

import { BrowserRouter as Router, Route,Redirect,Link,Switch } from 'react-router-dom';

import './App.css';

// const ProtectedRoute = ({ component: Comp, loggedIn , path, ...rest }) => {
//   return (
//     <Route
//       path={path}
//       {...rest}
//       render={props => {
//         return loggedIn ? (
//           <Comp {...props} />
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/",
//               state: {
//                 prevLocation: path,
//                 error: "You need to login first!",
//               },
//             }}
//           />
//         );
//       }}
//     />
//   );
// };

class App extends Component {
  // state = {
  //   loggedIn: false,
  // };


  render() {
    // const { state = {} } = this.props.location;
    // // const { error } = state;
    // <div>
    // <div className="tabs">
    // {error && <div>ERROR: {error}</div>}
   // console.log(this.props.location)
    return (
      <div>
        <Router>
          <div>
            <Route exact path='/' component={Login} />
            <Route exact path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path="/home"  component={Home} />
            <Route path="/expert" component={Expert}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;