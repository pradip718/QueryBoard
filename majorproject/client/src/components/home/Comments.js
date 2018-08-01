import React from "react";
import Edit from "./editComments";

export default class Comments extends React.Component{

    state={
        username:String
    }

    componentDidMount(){


        fetch('/login')
        .then((Response)=>Response.json()).
          then(data =>{

          this.setState({username:data.name})
          //console.log("name for user is:",this.state.username);
          
          })
    }
     render() {
       let {commentItem, key} = this.props;
       return (<div key={key}>
        <div className="list-group-item list-group-item-success">
            <span className="authorName">
                {commentItem.author}:-
            </span>
            {commentItem.text}
        </div>
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