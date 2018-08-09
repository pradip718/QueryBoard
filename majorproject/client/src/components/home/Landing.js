import React,{Component} from 'react';
import './Landings.css';

export default class Landing extends Component{
  render(){
      return(
        <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <div className="content">
                    <h1>Welcome to QueryBoard</h1>  
                    <h3>Ask query and get solutions from different people</h3>
                    <hr/>
                    <a href="/login" className="btn btn-primary"><i class="fa fa-tree"></i> Get Started!</a>
                </div>
            </div>
        </div>
    </div>
      );
  }
}