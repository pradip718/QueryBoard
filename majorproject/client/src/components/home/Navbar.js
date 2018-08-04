import React,{Component} from 'react';
import './Home.css';
import './Feeds.css';
{/*import { Navbar, Nav,NavItem, NavDropdown, MenuItem,Jumbotron } from 'react-bootstrap';*/}

    export default class Navbar extends Component{
        state = {
            username: [],
            response:[]
        }
        constructor(){
            super();

        }
        delay(){
            fetch('/login')
            .then((Response)=>Response.json()).
              then(data =>{
               //    JSON.parse(data);
               //    console.log("data from navbar",data.username);

               console.log( typeof(data));
               console.log(JSON.parse(data));
              })
        }

        componentDidMount() {

            //setTimeout(myFunction, 3000)

            this.delay();
           //setTimeout(this.delay, 3000);


          };
        render(){
            return(
                <div>
                
                    <nav className="navbar navbar-expand-lg navbar navbar-dark bg-primary">
                        <a className="navbar-brand" href="/home">QueryBoard</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                            <a className="nav-link active" href="/home">Home <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                            <a className="nav-link active" href="/expert">Expert</a>
                            </li>
                            <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                                <i className="bell" >Notifications</i>
                                
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="/">Action</a>
                                <a className="dropdown-item" href="/">Another action</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="/">Something else here</a>
                            </div>
                            </li>
                            <li> {this.state.username}
                            </li>
                           {/* <li className="nav-item">
                                <a className="nav-link disabled" href="/"></a>
                                </li>*/}
                        </ul>
                        
                        <form className="form-inline ">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" size='80'/>
                            <button className="btn btn-danger my-2 my-sm-0" type="submit" >Search</button>
                        </form>

                        
                        <div>
                        {/*User Profile*/}
                     {/*   <button class="button button5">50%</button>*/} 
                     <div className="dropdown">
                     <button className="btn btn-success button5     " type="button" data-toggle="dropdown">P
                     <span className="caret"></span></button>
                     <ul className="dropdown-menu dropdown-menu-left ">
                       <li><a href="/login">Sign Out</a></li>
                       <li><a href="#">CSS</a></li>
                       <li><a href="#">JavaScript</a></li>
                     </ul>
                   </div>



                        
                        </div>
                        </div>


                     </nav>
                </div>
            );
        }
    }