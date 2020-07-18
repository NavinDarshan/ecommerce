import React from 'react'
import * as authActions from '../actions/authActions'
import { connect } from 'react-redux';
import Products from './pictures'
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
class user extends React.Component {
    handleLogOut(event) {
        this.props.logoutUser(this.props.history);
        event.preventDefault();
    }
    render() {
        const products = Products.arrayOfProducts;
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" href="#">ShopFree.com</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Your Orders</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Deals Of The Day</a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <Slider autoplay={500}>
                    {products.map((item, index) => (
                        <div
                            key={index}
                            style={{ background: `url('${item.imgUrl}') no-repeat center center` }}
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