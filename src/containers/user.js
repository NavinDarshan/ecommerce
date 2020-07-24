import React from 'react'
import * as authActions from '../actions/authActions'
import { connect } from 'react-redux';
import Products from './pictures'
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import Navebar from './navbar'
import axios from 'axios'
class user extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          products: [],
        }
      }
    componentDidMount() {
        axios.get("/api/product/getphotos")
          .then(response => {
            const products = response.data;
            console.log(products)
            this.setState({ products });
          })
      }
    handleLogOut(event) {
        this.props.logoutUser(this.props.history);
        event.preventDefault();
    }
    randomNumber(num){
        return Math.floor(Math.random() * Math.floor(num))
    }
    offerProducts(){
        var offerProducts = [];
        for(let i = 0 ; i < 5 ; i++){
            offerProducts.push(this.state.products[this.randomNumber(6)])
        }
        console.log("2")
        return offerProducts;

    }
    render() {
        const {products } = this.state;
        const offerProducts = this.offerProducts()
        console.log("1")
        console.log(offerProducts[0])
        return (
            <div>
                <Navebar />
                <Slider autoplay={500}>
                    {products.map((item, index) => (
                        <div
                            key={index}
                             style={{ background: `url('/api/product/photo/${item._id}') no-repeat center center` }}
                        >
                            <div>
                                <h1>{item.name}</h1>
                                <p>{item.price}</p>
                            </div>
                        </div>
                    ))}
                </Slider>
                <div className="card-content">
                    <div className="text-center row">
                        {products.map((note, i) => {
                            return (
                                <div className="col-md-3 col-sm-6" key={note._id}>
                                    <div className="carduser">
                                    <img class="card-img-top" src={note.imgUrl} alt="Card image cap"/>
                                        <div className="card-body">
                                            <h5 className="card-text ">{note.name}</h5>
                                            <p className="card-text ">{note.price}</p>
                                            <button className = "btn btn-primary">Buy Now</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        )}

                    </div>
                </div>
            </div>

        )
    }
}
const mapStateToProps = (state) => ({
    auth: state.auth
})
const mapDispatchToProps = (dispatch) => ({
    logoutUser: (history) => dispatch(authActions.logoutUser(history))
})

export default connect(mapStateToProps, mapDispatchToProps)(user);


// <h1>I am the User</h1>
// <button onClick = {this.handleLogOut.bind(this)}>Logout</button>