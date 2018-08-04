import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import '../Login.css';
import "./Home.css"
import Post from "./Post"
//import Google from './GoogleLogin'

class query extends Component {

  constructor() {
    super();
    this.state = {
      userquery:'',
      queries:[]
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }
  
componentDidMount(){
  fetch('/query').
    then((Response)=>Response.json()).
    then(data =>{
      console.log("data is:",data);
        this.setState({queries:data.reverse()})
        console.log(this.state.queries[0].description);
    })
    
}
  render() {
    const {userquery } = this.state;
    
    return (
      <div class="container">
        <form action="http://localhost:5000/queries" method="POST">
          <h2 class="form-signin-heading" color="blue">Want to ask something? ask here!</h2>
         
          <label for="inputQuery" class="sr-only">query</label> 
          <textarea type="text" class="form-control" placeholder="want to ask something? ask here!" name="userquery" required/>
          <br/>
          <div class="form-group ">
            <input class="form-control" type="text" name="image" placeholder="image url"/>
          </div>
          <button class="btn btn-lg btn-primary btn-block" >Ask</button>
          
        </form>
        <section>
          <h2> Recent Posts</h2>
        </section>
        {this.state.queries.map((item, key) => {
          return (<Post item={item} key={key} />)
        }
      )
    }
      </div>
      
    );
 
  }
}

export default query;
