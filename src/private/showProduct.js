import React from 'react'
import axios from 'axios';
import './Product.css'

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
  render() {
    const { products } = this.state;
    return(
    <div className = "container" >
      <div className = "row">
      {products.map((Product, i) => {
        return(
      <div className = "col-6 col-md-3">
      <div class="card">
        <h2 className = "text-primary text-center">{Product.name}</h2>
        <img src={`/api/product/photo/${Product._id}`} alt="Card image cap" className = "photo"/>
        <div class="card-body">
        <h5 class="card-title">{Product.category}</h5>
        <p class="card-text">{Product.description}</p>
        </div>
        <ul class="list-group list-group-flush">
        <li class="list-group-item">price {Product.price}</li>
        <li class="list-group-item">Availabe quantity : {Product.quantity}</li>
        </ul>
        <div class="card-body">
          <a href="#" class="card-link">Buy Now</a>
          <a href="/cart" class="card-link">Add to Cart</a>
        </div>
      </div>
      </div>
      )
      }
      )}
      </div>
    </div>
    )
  }
}
export default showProducts;




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

