import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import './Blogs.css';
import "./ratings.css";
import Post from "./EPost"
//import Google from './GoogleLogin'

class Blogs extends Component {

  constructor() {
    super();
    this.state = {
      userquery:'',
      queries:[],
      username: [],    
      comment:[],
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }
  
componentDidMount(){
  fetch('/Blogs').
  then((Response)=>Response.json()).
        then(data =>{
          //console.log("data is:",data);
            this.setState({queries:data.reverse()})
            //console.log(this.state.queries[0].query);
           // console.log("stories data",data[0].description );
          })



          //temporary method of getting username
          fetch('/login')
          .then((Response)=>Response.json()).
            then(data =>{
            this.setState({username:data.name})
            console.log("name for user is:",this.state.username);
            
            })
}
//   render() {
//     const {userquery } = this.state;
    
//     return (
//       <div class="container">
//         <form action="http://localhost:5000/blogs" method="POST">
//           {/* <h2 class="form-signin-heading" color="blue">Want to ask something? ask here!</h2>
//           */}
//           <label for="inputQuery" class="sr-only">query</label> 
//           <textarea type="text" class="form" placeholder="Write Blog about something." name="userquery" required/>
        
//           <button class="btn btn-lg FA btn-primary" >Post</button>
          
//         </form>
//         <section>
//           <h2>Blogs from Experts</h2>
//         </section>
//         {this.state.queries.map(function(item, key) {
//           return(
//         <div>

//         <hr/>
//         <div  className="list-group-item list-group-item-secondary row view">
//           {item.name}
//           <div>
//             {item.description}
//           </div>
//         </div>
         
//         </div>
//           )
//       })}
//       </div>
      
//     );
 
//   }
// }
render() {
  
  return (
    <div className="container">
        <form action="http://localhost:5000/blogs" method="POST">
          {/* <h2 class="form-signin-heading" color="blue">Want to ask something? ask here!</h2>
          */}
          <label for="inputQuery" class="sr-only">query</label> 
          <textarea type="text" class="form" placeholder="Write Blog about something." name="userquery" required/>
        
      <button class="btn btn-lg FA btn-primary" >Post</button>
    
          
        </form>
      {this.state.queries.map((item, key) => {
        return (<Post item={item} key={key} />)
      }
    )
  }
</div>

)
}
}
export default Blogs;
