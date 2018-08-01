import React,{Component} from 'react';
import "./Home.css";
import "./ratings.css";
//styling ko lagi css ne import gardeko chu Query.css
export default class Stories extends Component{

    constructor(props) {
        super();
        this.state = {
          userquery:'',
          username: [],          
          queries:[],
          comment:[],
          clicks:0,
        };
      }
      clicked = () =>{
        
       this.setState({ clicks: this.state.clicks + 1});
      // this.setState({ show: !this.state.show });
      // console.log(this.state.clicks);
      }
      clickedd = () =>{
        
        this.setState({ clicks: this.state.clicks - 1});
      // this.setState({ show:!this.state.show });
      // console.log(this.state.clicks);
      }
      ToggleClick = () => {
        this.setState({ show: !this.state.show });
      }
    
    componentDidMount(){
      fetch('/query').
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
             //    JSON.parse(data);
             //    console.log("data from navbar",data.username);

            //  console.log( typeof(data));
            //  console.log(JSON.parse(data));
            this.setState({username:data.name})
            console.log("name for user is:",this.state.username);
            
            })
    }


      render() {

        return (
          <div className="container">
          
            {this.state.queries.map((item, key)=> {
              return( 
            <div key={key}>
    
              <hr/>
              
              <div  className="list-group-item list-group-item-secondary row ">
                  <div className="authorName">{item.name}</div>
                  <div>
                    {item.description}
                  </div>
                  <hr/>
                  <div>
                    <button  className="btn btn-info" data-toggle="collapse" data-target="#demo"onClick={()=>{
                      return(
                        
                        fetch('/queries/'+item._id).
                        then((Response)=>Response.json()).
                        then(data =>{
                          //console.log("comment is:",data.comments);
                          
                          this.setState({comment:data.comments});
                          //console.log("comment success", this.state.comment);
                        })
                      )
                    }}> <i className="comment" >Comment</i>
                    
                      
                    </button>
                    <button className="btn upvote" onClick={ this.clicked.bind(this) }>upvote</button>
                    <button className="btn downvote" onClick={this.clickedd.bind(this) }>downvote</button>
                    <button className="btn status" onClick={this.ToggleClick}>
                    { !this.state.show ? 'rating status ' : 'rating status ' }
        </button>
        { this.state.show ? <h2>{ this.state.clicks }</h2> : '' }


                    <div id="demo" className="collapse">
                    <br/>

                        <form className="commentForm" action={"http://localhost:5000/queries/"+item._id} method="POST">
                          <input type="text" className="form-control" placeholder="Write a comment..." name="comment"/>

                          <button className="btn btn-lg btn-primary btn-block" >Post</button>
                        </form>
                        <br/>
                        <div>
                         { 
                              
                              this.state.comment.map((commentItem, key)=> {
                                return(<div className="list-group-item list-group-item-success">
                                  <span className="authorName">{commentItem.author}</span> {commentItem.text}
                                  </div>
                                )
                              })
                          }
                          
                      </div>
                    </div>
                  </div>
              </div>
            </div>
              )
          })}
          </div>
        );
      }
}