import React from 'react'
import axios from 'axios'
import { connect} from "react-redux";

class order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }
    componentDidMount() {
        axios.get("/api/user/order/" + this.props.user_id)
            .then(res => {
                const ordervalues = res.data;
                this.setState({ products: ordervalues.order })
                console.log(res.data.order)
            })
    }
    render() {
        const {products} = this.state
        return (
            <div>
                {products.map((Product, i) => {
                    return (
                        <div className="col-6 col-md-3" key={Product._id} >
                            <div className="card">
                                <h2 className="text-primary text-center">{Product.name}</h2>
                                <img src={`/api/product/photo/${Product._id}`} alt="Card image cap" className="photo" />
                                <div className="card-body">
                                    <h5 className="card-title">{Product.category}</h5>
                                    <p className="card-text">{Product.description}</p>
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">price {Product.price}</li>
                                    <li className="list-group-item">Availabe quantity : {Product.quantity}</li>
                                </ul>
                                <div className="card-body">
                                    <a href="#" className="btn btn-primary mr-2">Buy Now</a>
                                    <a onClick={() => this.deleteFromCart(Product)} className="btn btn-primary">Remove</a>
                                </div>
                            </div>
                        </div>
                    )
                }
                )}
            </div>
        )
    }
}
const mapstateToProps = (state) => {
    return {
        user_id: state.auth.user.id
    }
}
export default connect(mapstateToProps)(order)