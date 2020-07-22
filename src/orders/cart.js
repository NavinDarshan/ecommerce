import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux';

class cart extends React.Component{
    constructor(props){
        super(props);
        this.props = {
            products : []
        }
    }
    componentDidMount(){
        axios.get("/api/user/cart/"+this.props.user_id)
        .then(res => {
            const cartvalues = res.data;
            console.log(cartvalues)
            this.setState({products : cartvalues})
        })
    }
    render(){
        const products = this.state.products;
        console.log(products)
        return(
            <p>Welcome to cart</p>
        )
    }
}
const mapstateToProps = (state) =>{
    return{
        user_id : state.auth.user.id
    }
}
export default connect(mapstateToProps)(cart)