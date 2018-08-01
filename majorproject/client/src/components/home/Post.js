import React from 'react';
import Comment from "./Comments"


export default class Post extends React.Component{
    state = {
       comments: []
    }
  
    render() {
  
      let {item, key} = this.props;
      return (<div key={key}>
              <hr />
  
              <div className="list-group-item list-group-item-secondary row ">
                <div className="authorName">{item.name}</div>
                <div>{item.description}</div>
                <br/>
                <div>
                    <img src= {item.image}/>
                </div>
                <hr />
                <div>
                  <button
                    className="btn btn-info"
                    data-toggle="collapse"
                    data-target="#demo"
                    onClick={() => {
                      return fetch("/queries/" + item._id)
                        .then(Response => Response.json())
                        .then(data => {
                          this.setState({ comments: data.comments });
                        });
                        this.demo.bind(this);
                    }}
                  >
                    Comment
                  </button>
                  <div id="demo" className="collapse">
                    <br />
                    <form
                      className="commentForm"
                      action={"http://localhost:5000/queries/" + item._id}
                      method="POST"
                    >
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Write a comment..."
                        name="comment"
                      />
                      <button className="btn btn-lg btn-primary btn-block">
                        Post
                      </button>
                    </form>
                    <br/>
                    <div>
                      {this.state.comments.map((commentItem, key) => {
                        return (<Comment commentItem={commentItem} key={key} />)
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>)
  }
}