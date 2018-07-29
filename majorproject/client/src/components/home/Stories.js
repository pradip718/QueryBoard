import React,{Component} from 'react';
//styling ko lagi css ne import gardeko chu Query.css
export default class Stories extends Component{

    constructor() {
        super();
        this.state = {
          userquery:'',
          queries:[]
        };
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
        
    }
      render() {
        return (
          <div class="container">
          
            {this.state.queries.map(function(item, key) {
              return(
            <div>
    
            <hr/>
            
            <div  className="list-group-item list-group-item-secondary row">
                {item.name}
                <div>
                  {item.description}
                </div>
                <hr/>
                <div>
                <button  className="btn btn-info" data-toggle="collapse" data-target="#demo">Comment</button>
               
               
                <div id="demo" className="collapse">
                <br/>
                
                <form class="commentForm" action={"/queries/"+item._id} method="POST">               
                <input type="text" class="form-control" placeholder="comment..." name="comment"/>
              
                <button class="btn btn-lg btn-primary btn-block" >Post</button>
                
              </form>

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