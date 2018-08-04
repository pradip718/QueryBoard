import React,{Component} from 'react';
import './Feeds.css';
//import News from "./News";
import Query from "./Stories";
import Blogs from "./Blogs"
export default class Efeeds extends Component{
    state={
        response:""
    }

    displayTitle(id){
        console.log(id)
        var x=document.getElementById(id);
        // console.log(x);
        // alert(x.textContent);
        if(id=="question"){
            this.setState({
                response: "question"
            });
        }
        else if(id=="Blogs"){
            this.setState({
                response: "Blogs"
            });
        }
       
    
        console.log(this.state.response)

    }

     displaytitle(){
        console.log("dfdfoil",this.state.response)
        if(this.state.response=="question"){
            return(
            <Query/>)
        }
        else if(this.state.response=="Blogs"){
            return(
                <Blogs/>
            )
        }
    
    }



    render(){

 
        return(
            <div>
                    <div className="container-fluid">
                        <div className="row">
                        <div className="col-sm-2">
                            {/*Feeds*/}
                            <table className="table table-hover col-sm-3" width='50%'>
                                {/*Feeds*/}
                                <thead>
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col">E-Feeds</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td id="comment" onClick={()=>this.displayTitle("Blogs")}>Blogs</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td id="question" onClick={()=>this.displayTitle("question")}>QueryBoard</td>
                                        
                                        
                                    </tr>
                                 
                                </tbody>
                               
                                
                                </table>
                        </div>
                        <div className="col-sm-6">
                            {
                                this.displaytitle()
                        }
                        </div>
                        {/* <div className="col-sm-3 textalign">
                           <strong> Latest Tech News </strong>
                            
                            <News/>
                        </div> */}
                    </div>
                </div>
            </div>
        );
    }
}