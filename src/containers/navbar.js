import React from 'react'
import Login from './login'
import Register from './signup'
import * as authActions from '../actions/authActions'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showLogin: false,
            showSignup: false
        }

        this.toggleLogin = this.toggleLogin.bind(this);
        this.toggleSignup = this.toggleSignup.bind(this);
    }
    handleLogout(event) {
        this.props.logoutUser(this.props.history);
        event.preventDefault();
    }

    toggleLogin() {
        this.setState({ showLogin: !this.state.showLogin, showSignup: false });
    }

    toggleSignup() {
        this.setState({ showSignup: !this.state.showSignup, showLogin: false });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.viewLogin !== prevProps.viewLogin) {
            this.setState({ showLogin: true })
        }
    }
    render() {
        const { isAuthenticated, flash, flashMessage, success } = this.props;
    
        let view, flashMes;
        if (!isAuthenticated) {
          view =
            <div className="navbar-nav ml-auto">
              <p className="nav-item mr-sm-3 nav-link" onClick={this.toggleLogin}>Login</p>
              <p className="nav-item mr-sm-3 nav-link" onClick={this.toggleSignup}>SignUp</p>
            </div>
        }
        else {
          view =
            <div className="navbar-nav ml-auto">
              <p className="nav-item  nav-link">{this.props.user.name}</p>
              <p className="nav-item mr-sm-3 nav-link" onClick={this.handleLogout.bind(this)}>Logout</p>
            </div>
        }
    
        if (flash) {
          if (success) {
            flashMes = <p className="flash text-center bg-success">{flashMessage}</p>
            setTimeout(() => {
              this.props.resetFlash();
            }, 1000);
          }
          else {
            flashMes = <p className="flash text-center bg-danger">{flashMessage}</p>
            setTimeout(() => {
              this.props.resetFlash();
            }, 1000);
          }
        }
        return (
          <div>
          <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <a className="navbar-brand" href="/">Amazon</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <a className="nav-item nav-link" href="/showproduct">Show Products</a>
                <a className="nav-item nav-link" href="/cart">Cart</a>
              </div>
              <div className=" ml-md-auto">
                {view}
              </div>
            </div>
            </nav>
            {flashMes}
            {this.state.showLogin ? <div className="popup"><Login showLogin={this.toggleLogin} showSignup={this.toggleSignup} /></div> : null}
            {this.state.showSignup ? <div className="popup"><Register showLogin={this.toggleLogin} showSignup={this.toggleSignup} /></div> : null}
          </div>
        )
      }


}
const mapStateToProps = state => {
    return {
      user: state.auth.user,
      isAuthenticated: state.auth.isAuthenticated,
      flashMessage: state.auth.flashMessage,
      flash: state.auth.flash,
      success: state.auth.success
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      logoutUser: (history) => dispatch(authActions.logoutUser(history)),
      resetFlash: () => dispatch(authActions.resetFlash())
    }
  }
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(navbar));











// render(){
//     const { isAuthenticated, flash, flashMessage, success } = this.props;
//     return(

//         <div>
//             <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
//                 <a className="navbar-brand" href="#">ShopFree.com</a>
//                 <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
//                     <span className="navbar-toggler-icon"></span>
//                 </button>
//                 <div className="collapse navbar-collapse" id="navbarNavDropdown">
//                     <ul className="navbar-nav">
//                         <li className="nav-item active">
//                             <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
//                         </li>
//                         <li className="nav-item">
//                             <a className="nav-link" href="/showproduct">Show Products</a>
//                         </li>
//                         <li className="nav-item">
//                             <a className="nav-link" href="#">Deals Of The Day</a>
//                         </li>
//                     </ul>
//                 </div>
//             </nav>
//         </div>
//     )
// }