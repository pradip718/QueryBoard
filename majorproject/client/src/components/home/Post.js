import React from 'react';
import Comment from "./Comments";

import  "./Posts.css";
import moment from "moment";
import Google from './GoogleApi';



export default class Post extends React.Component{

   
  constructor(props){
    super(props);
      this.state = {
        comments: [],
        rating: 0,
        averageRating:String,
        username:String,
        googleApi:String
     }
  }

  componentDidMount(){
    let {item, key} = this.props;
    fetch('/queries/ratings/'+item._id).
      then((Response)=>Response.json()).
      then(data =>{
        console.log("data is:", data);
          this.setState({averageRating:data.average})
      console.log("avaerae raitng is",this.state.averageRating)

      })

      //fetch log in username
      fetch('/login')
      .then((Response)=>Response.json()).
        then(data =>{

        this.setState({username:data.name})
        //console.log("name for user is:",this.state.username);
        
        })

      //fetching queries result from google
      // fetch('https://www.googleapis.com/customsearch/v1?key=AIzaSyBz9GnWn7AErndH9HFHjaqEEnd8iQEoiaE&cx=017576662512468239146:omuauf_lfve&q='+item.description).
      // then((Response)=>Response.json()).
      // then(data =>{
      //   console.log("data is:", data.items[0].title);
      //   this.setState({googleApi:data.items[0].title})
        
      // })
  }


    onStarClick(nextValue, prevValue, name) {
      let {item, key} = this.props;
      this.setState({rating: nextValue})
      console.log("ratings is ",nextValue);
    //  alert(`Submitting: ${JSON.stringify(data)}`)
    
      fetch(
        'http://localhost:5000/queries/ratings/'+item._id,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: JSON.stringify({rating: nextValue}),
        },
      )


    render() {
  
      let {item, key} = this.props;
     
      return (<div key={key}>
              <hr />
  
              <div className="list-group-item list-group-item-secondary row ">
                <div className="authorName">{item.name.split("@")[0]}</div>
                <div className="text-secondary">{moment(item.date).fromNow()}</div>
                <br/>
                <div className="text-dark">{item.description}</div>
                <br/>
                {
                  item.image=="" ? (
                    <div></div>
                  ) :(
                    <div>
                      <img src= {item.image} className="img-thumbnail imageAlign"/>
                    </div>
                  )
                }

                <hr />
                <div >{item.tags.map((tagItem, key) => {
                  return (<span className="badge tagStyle">{tagItem}</span>)
                })}</div>

                <br/>
                <span className="userRating">
  
                  <p><strong>Rate the Post:</strong> {rating}</p>
                  <StarRatingComponent 
                    name="rate" 
                    starCount={5}
                    value={rating}
    
                    onStarClick={this.onStarClick.bind(this)}
                  />
              </span>
              
              <span className="averageRating">
                <p><strong>Average Rating:</strong> {this.state.averageRating}</p>
                <StarRatingComponent 
                  name="rate" 
                  starCount={5}
                  editing={false}
                  renderStarIcon={() => <span>❤</span>}
                  value={this.state.averageRating}
                  onStarClick={this.onStarClick.bind(this)}
                />
              </span>
              <br/>

                
                <div className="answerButton">
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
                    
                  {this.state.username==item.name?(
                    <div>
                      <Google description={item.description}/>

                    </div>
                  ):(
                    <div></div>
                  )}
                  <br/>


                    <form
                      className="commentForm"
                      action={"http://localhost:5000/queries/" + item._id}
                      method="POST"
                    >
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Write your answer..."
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