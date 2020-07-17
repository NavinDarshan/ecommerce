import React from 'react'
import './App.css'
import * as authActions from '../actions/authActions'
import { connect } from "react-redux";

class login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email : "",
            password : ""
        }
        this.changeHandle = this.changeHandle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
          this.props.history.push("/user");
        }
      }
    
      componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
          this.props.history.push("/user");
        }
    
        if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          });
        }
      }
    changeHandle(event){
        this.setState({ [event.target.name] : event.target.value});
        event.preventDefault();
    }
    handleSubmit = (event) =>{
      const {email , password} = this.state;
      this.props.userReq("/api/user/login" ,{email, password})
      event.preventDefault();
    }
    render(){
        return (
            <div className="loginBgImage">
                <p className="bg-success">login</p>
                <div className="container  d-flex justify-content-center align-items-center">
                    <form>
                        <div className="login-content">
                            <div className="form-group">
                                <label>username</label>
                                <input className="form-control" name = "email" value = {this.state.email} type="email" placeholder = "Enter Your Email" onChange = {this.changeHandle} required />
                            </div>
                            <div className="form-group">
                                <label>password</label>
                                <input className="form-control" name = "password" value = {this.state.password} type="text" placeholder = "Enter Your Password" onChange = {this.changeHandle}required />
                            </div>
                            <div className="row align-items-center remember">
                                <input type="checkbox" />Remember Me
                        </div>
                            <div className="form-group">
                                <button className = "btn float-right bg-success" onClick={this.handleSubmit}>Login</button>
                            </div><br></br>
                            <div className="justify-content-center">Don't have an account?<a className="link" href="/signup">Sign Up</a></div>
                        </div>
                    </form>

                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) =>({
  auth: state.auth,
  errors: state.errors
})

const mapDispatchToProps = (dispatch) =>{
  return{
    userReq : (url, body) => dispatch(authActions.loginUser(url, body)),
  }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(login);