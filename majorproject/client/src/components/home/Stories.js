import React,{Component} from 'react';
import "./Home.css";
import "./ratings.css";
import Post from "./Post"
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
          {this.state.queries.map((item, key) => {
            return (<Post item={item} key={key} />)
          }
        )
      }
        </div>
      )
  }
}