import React from 'react'
import axios from 'axios';
import './Product.css'
import {connect} from 'react-redux'
import Navebar from '../containers/navbar'

class showProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
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
  addtoCart(product) {
    axios.post("/api/user/cartadd/" , {userid : this.props.user_id , product : product , email : this.props.user_mail });
  }
  buyNow(product) {
    axios.post("/api/user/order/" , {userid : this.props.user_id , product : product , email : this.props.user_mail });
  }
  render() {
    const { products } = this.state;
    return (
      <div>
        <Navebar />
        <div className="container" >
          <div className="row">
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
                      <a onClick = {() => this.buyNow(Product)} className="btn btn-primary mr-2">Buy Now</a>
                      <a onClick={() => this.addtoCart(Product)} className="btn btn-primary">Add to Cart</a>
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

const mapStateToProps = (state) => {
  console.log(state)
  return{
    user_id : state.auth.user.id,
    user_mail : state.auth.user.email
  }
}
export default connect(mapStateToProps)(showProducts);




// return(
//   <div>
//   {products.map((note, i) => {
//       return (
//         <div className="col-md-3 col-sm-6" >
//           <div className="carduser">
//             <div className="card-body">
//               <h5 className="card-text ">{note.name}</h5>
//               <p className="card-text ">{note.price}</p>
//               <p className="card-text ">{note.quantity}</p>
//               < img src = {`/api/product/photo/${note._id}`} alt = "its loading"/>
//             </div>
//           </div>
//         </div>
//       )
//     }
//     )}
//     </div>
// )

