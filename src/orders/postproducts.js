import React from 'react'
import axios from 'axios'
import * as orderActions from '../actions/orderActions'
import {connect} from 'react-redux'

class postproducts extends React.Component{
    constructor(props){
        super(props);
        this.state = { 
            productName :"",
            price : "",
            category : ""

        }
    }
    changeHandle = (event) =>{
        this.setState({ [event.target.name] : event.target.value});
        event.preventDefault();
    }
    postProduct = (event) =>{
        const {productName , price , category} = this.state;
        this.props.postproducts("/api/user/postproducts" ,{productName , price , category} , this.props.history)
        event.preventDefault();
    }
    render(){
        return(
            <div>
            <form>
                <input type = "text" name = "productName" placeholder="ProductName" onChange = {this.changeHandle}/>
                <input type = "text" name = "price" placeholder = "Price" onChange = {this.changeHandle}/>
                <input type = "text" name = "category" placeholder = "category" onChange = {this.changeHandle}/>
                <button onClick = {this.postProduct}>Submit</button>
            </form>
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
    postproducts : (url , body) => dispatch(orderActions.postProducts(url, body))
    }
}

export default connect(null, mapDispatchToProps)(postproducts);