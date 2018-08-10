import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import '../Login.css';
import "./Home.css";
import Post from "./Post";
import { WithContext as ReactTags } from 'react-tag-input';

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
      image:[],
      tags: [],
    suggestions: [
        { id: "Javascript", text: "Javascript" },
        { id: "Java", text: "Java" },
        { id  : 'node.js', text: 'node.js' },
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
      // this.setState({queries:data.sort(function(a, b) {
      //   return parseFloat(b.avgRating) - parseFloat(a.avgRating);
      //    })
      //   })

      //  var result= this.state.queries.sort(function(a, b) {
      //     return parseFloat(b.avgRating) - parseFloat(a.avgRating);
      // });

        //console.log("item is",result);
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


onSubmit = e => {
  e.preventDefault()
  const {userquery,image, tags} = this.state
  const data = {userquery,image, tags: tags.map(x => x.id)}
//  alert(`Submitting: ${JSON.stringify(data)}`)

  fetch(
    '/queries',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(data),
    },
  )
}

  render() {
    const {userquery,image } = this.state;
    const { tags, suggestions } = this.state;

    return (
      <div class="container">
            <form action="http://localhost:5000/queries" method="POST" onSubmit={this.onSubmit}>
              <h2 class="form-signin-heading" color="blue">Want to ask something? ask here!</h2>
              <label for="inputQuery" class="sr-only">query</label> 
              <textarea type="text" class="form-control" placeholder="want to ask something? ask here!" name="userquery"onChange={this.onChange} defaultValue={userquery} required/>
              <br/>
              <div class="form-group ">
                <input class="form-control" type="text" name="image" placeholder="image url" onChange={this.onChange} defaultValue={image}/>
              </div>

              <div class="form-group ">
              <ReactTags 
                  name='tags'
                  tags={tags}
                  editing={false}
                  suggestions={suggestions}
                  handleDelete={this.handleDelete}
                  handleAddition={this.handleAddition}
                  handleDrag={this.handleDrag}
                  delimiters={delimiters}
                  required/>
            </div>
            <br/>
              <button class="btn btn-lg btn-primary btn-block" >Ask</button>
            </form>
            <br/>
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