import React from "react";
import Edit from "./editComments";
import StarRatingComponent from 'react-star-rating-component';
import "./ratings.css";


export default class Comments extends React.Component{

    constructor(props){
        super(props);
          this.state = {
            comments: [],
            rating: 0,
            username:String
         }
      }
    
    
        onStarClick(nextValue, prevValue, name) {
          let {commentItem, key} = this.props;
          this.setState({rating: nextValue})
          const data = {ratings:nextValue}
          console.log("ratings is ",nextValue);
        //  alert(`Submitting: JSON.stringify(data)}`)
        
          fetch('/queries/comment/ratings/'+commentItem.author,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json; charset=utf-8' },
              body: JSON.stringify({ratings:nextValue}),
            }
          )
        }
    
    componentDidMount(){


        fetch('/login')
        .then((Response)=>Response.json()).
          then(data =>{

          this.setState({username:data.name});
          //console.log("name for user is:",this.state.username);
          this.setState({ratings:data.rating})
          })
    }
     render() {
        
        const { rating} = this.state;
       let {commentItem, key} = this.props;
       return (<div key={key}>
        <div className="list-group-item list-group-item-success">
            <span className="authorName">
                {commentItem.author.split("@")[0]}:-
            </span>
            {commentItem.text}
        </div>

   <br/>
                <span  className="rating">
  
                  <p>Rate the Comment: {rating}</p>
                  <StarRatingComponent 
                    name="rate" 
                    starCount={5}
                    value={rating}
                    onStarClick={this.onStarClick.bind(this)}
                  />
           
              </span>
              <br/>

        </div>
        
       )
    }
}

/*
        {this.state.username==commentItem.author ?(
            <div>
                <button
                className="btn btn-info"
                onClick={() => {
                    <Edit/>
                }}
            >
                Edit
            </button>
            </div>
        ):(
            <div></div>
        )}
*/