import React from 'react'
import {connect} from 'react-redux'
import * as orderActions from '../actions/orderActions'

class products extends React.Component{

    componentDidMount(){
        this.props.getRequest("/api/user/products", this.props.history)
    }

    render(){
        const {mname} = this.props;
        return(
            <div>
            <h1>this is product page</h1>
            {mname.map((note, i) => {
                return (
                  <div className="col-md-3 col-sm-6" key={note._id}>
                    <div className="carduser">
                      <div className="card-body">
                        <h5 className="card-text ">{note.productName}</h5>
                        <p className="card-text ">{note.price}</p>
                        <p className="card-text ">{note.category}</p>
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

const mapStateToProps = (state) => {
    console.log(state.prod)
    return {
      mname: state.prod.data
    }
  }
  const mapDispatchToprops = (dispatch) =>{
      return{
        getRequest: (url, history) => dispatch(orderActions.getProducts(url, history)),
      }
  }
  export default connect(mapStateToProps , mapDispatchToprops)(products);