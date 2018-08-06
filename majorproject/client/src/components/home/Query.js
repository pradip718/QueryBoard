import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import '../Login.css';
import "./Home.css";
import Post from "./Post";
import { WithContext as ReactTags } from 'react-tag-input';

//import Google from './GoogleLogin'


const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];



class query extends Component {

  constructor() {
    super();
    this.state = {
      userquery:'',
      queries:[],

      tags: [

     ],
    suggestions: [
      { id: "Javascript", text: "Javascript" },
      { id: "Java", text: "Java" },
        { id: 'node.js', text: 'node.js' },
        { id: 'react.js', text: 'react.js' },
        { id: 'express', text: 'express' },
        { id: 'bootstrap', text: 'bootstrap' },
        { id: 'python', text: 'python' },
        { id: 'c++', text: 'c++' }
     ]
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
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

handleDelete(i) {
  const { tags } = this.state;
  this.setState({
   tags: tags.filter((tag, index) => index !== i),
  });
}

handleAddition(tag) {
  this.setState(state => ({ tags: [...state.tags, tag] }));
}

handleDrag(tag, currPos, newPos) {
  const tags = [...this.state.tags];
  const newTags = tags.slice();

  newTags.splice(currPos, 1);
  newTags.splice(newPos, 0, tag);

  // re-render
  this.setState({ tags: newTags });
}


  render() {
    const {userquery } = this.state;
    const { tags, suggestions } = this.state;

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

          <div>
          <ReactTags tags={tags}
              suggestions={suggestions}
              handleDelete={this.handleDelete}
              handleAddition={this.handleAddition}
              handleDrag={this.handleDrag}
              delimiters={delimiters} />
      </div>
      <br/>
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
