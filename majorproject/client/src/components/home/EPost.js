import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import Comment from "./Comments";
import  "./Posts.css";


export default class Post extends React.Component{
    state = {
       comments: [],
       rating: 0,
    }

    onStarClick(nextValue, prevValue, name) {
      this.setState({rating: nextValue});
    }
  
    render() {
      const { rating } = this.state;
      let {item, key} = this.props;
      return (<div key={key}>
              <hr />
  
              <div className="list-group-item list-group-item-secondary row ">
                <div className="authorName">{item.name}</div>
                <div>{item.description}</div>
                <br/>
                {
                  item.image=="" ? (
                    <div></div>
                  ) :(
                    <div>
                      <img src= {item.image} className="img-thumbnail "/>
                    </div>
                  )
                }


                <hr />
                <span>
                  
                  <p>Rate the Post: {rating}</p>
                  <StarRatingComponent 
                    name="rate1" 
                    starCount={5}
                    value={rating}
                    onStarClick={this.onStarClick.bind(this)}

                  />
              </span>
              <br/>

                <div >
                  <button
                    className="btn btn-info"
                    data-toggle="collapse"
                    data-target="#demo"
                    onClick={() => {
                      return fetch("/Blogs/" + item._id)
                        .then(Response => Response.json())
                        .then(data => {
                          this.setState({ comments: data.comments });
                        });
                        this.demo.bind(this);
                    }}
                  >
                    Answer
                  </button>




                  <div id="demo" className="collapse">
                    <br />
                    <form
                      className="commentForm"
                      action={"http://localhost:5000/Blogs/" + item._id}
                      method="POST"
                    >
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Write a comment..."
                        name="comment"
                      />
                      <br/>
                      <button className="btn btn-lg btn-primary btn-block postButton">
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