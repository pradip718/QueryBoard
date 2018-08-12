import React from "react";

export default class GoogleApi extends React.Component{
    
    constructor(){
        super();
        this.state={
            recommend:String,
            link:String,
        }
    }
    componentDidMount(){
        const {description}=this.props;
        fetch('https://www.googleapis.com/customsearch/v1?key=AIzaSyCETavbwPht_Z6mmE9GDMYvnEL_QmBnEiA&cx=017430328052667909926:e6m_9kbdnio&q='+description).
        then((Response)=>Response.json()).
        then(data =>{
            console.log('data data',data.items[0].link)
          this.setState({recommend:data.items[0].title,link:data.items[0].link});
        })

    }

    render(){
        const {description}=this.props;

        return(
            <div className="list-group-item list-group-item-success">
                For instance, checkout <a href={this.state.link}> {this.state.recommend}</a> for  your queries.
                <br/>
            </div>
        )
    }
}