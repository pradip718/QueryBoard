import React,{Component} from 'react';
import "./ratings.css";

export default class Landing extends Component{
  render(){
      return(
        <div className="title">
       
       
                
                    <h1>Welcome to QueryBoard</h1>  
                    <h3>Ask query and get solutions from different people</h3>
                    <hr/>
                    <a href="/login" className="btn btn-primary"><i className="fa fa-tree"></i> Get Started!</a>
                
       
       
    </div>
      );
  }
}