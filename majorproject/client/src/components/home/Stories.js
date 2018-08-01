import React,{Component} from 'react';
import "./Home.css"
import Comment from "./Comments";
import Post from "./Post"
//styling ko lagi css ne import gardeko chu Query.css
export default class Stories extends Component{

    constructor(props) {
        super();
        this.state = {
          userquery:'',
          username: [],          
          queries:[],
          comment:[]
        };
      }
      
      
    componentDidMount(){
      fetch('/query').
        then((Response)=>Response.json()).
        then(data =>{
            this.setState({queries:data.reverse()})

          })



          //temporary method of getting username
          fetch('/login')
          .then((Response)=>Response.json()).
            then(data =>{

            this.setState({username:data.name})
            console.log("name for user is:",this.state.username);
            
            })
    }


    render() {
      return (
        <div className="container">
          {this.state.queries.map((item, key) => {
            return (<Post item={item} key={key} />)
          }
        )
      }
        </div>
      )
  }
}