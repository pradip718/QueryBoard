import React from 'react';
import Comment from "./Comments";
import "./Home.css"

export default class Post extends React.Component{

   
  constructor(props){
    super(props);
      this.state = {
        comments: [],
        rating: 1,
     }
     
    
  }


    onStarClick(nextValue, prevValue, name) {
      let {item, key} = this.props;
      this.setState({rating: nextValue})
      const data = {ratings:nextValue}
      console.log("ratings is ",nextValue);
    //  alert(`Submitting: ${JSON.stringify(data)}`)
    
      fetch(
        '/queries',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: JSON.stringify(data),
        },
      )


    render() {
  
      let {item, key} = this.props;
      return (<div key={key}>
              <hr />
  
              <div className="list-group-item list-group-item-secondary row ">
                <div className="authorName">{item.name.split("@")[0]}</div>
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
                <div >{item.tags.map((tagItem, key) => {
                  return (<span className="badge tagStyle">{tagItem}</span>)
                })}</div>

                <br/>
                <span>
  
                  <p>Rate the Post: {rating}</p>
                  <StarRatingComponent 
                    name="rate" 
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
                      return fetch("/queries/" + item._id)
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
            </div>
          )
        }
}