import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../actions/auth";
import { ButtonContainer } from "./style/Button";
import { loginUser, signUser } from "./../actions/auth";
import styled from "styled-components";
import Title from "../components/style/Title";
import Modal from "react-responsive-modal";
import 'react-responsive-modal/styles.css';
import * as firebase from 'firebase';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
        currentUser: null,
        sign: false,
        login: false
    };
  }
  state = { 
    email: "", 
    password: "",
    signup_name:"",
    signup_email: "", 
    signup_password: "",
    signup_password2: ""
  };
  handleEmailChange = ({ target }) => {
    this.setState({ email: target.value });
  };
  handlePasswordChange = ({ target }) => {
    this.setState({ password: target.value });
  };
  handleSignUpNameChange = ({ target }) => {
    this.setState({ signup_name: target.value });
  };
  handleSignUpEmailChange = ({ target }) => {
    this.setState({ signup_email: target.value });
  };
  handleSignUpPasswordChange = ({ target }) => {
    this.setState({ signup_password: target.value });
  };
  handleSignUpPassword2Change = ({ target }) => {
    this.setState({ signup_password2: target.value });
  };
  handleSubmit = () => {
    const { dispatch } = this.props;
    const { email,password } = this.state;
    dispatch(loginUser(email, password));
  };
  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  };
  handleSignUp= () => {
    const { dispatch } = this.props;
    const { signup_name,signup_email,signup_password,signup_password2 } = this.state;

    if(signup_password===signup_password2){
      dispatch(signUser(signup_name, signup_email,signup_password));
    }
    else{
      console.log("Password Harus Sama !");
    }
  };
  openModalSignUp = () => {
    this.setState({ sign: true });
  };
  OpenModalLogin = () => {
      this.setState({ login: true });
  };
  closeModalSignUp = () => {
      this.setState({ sign: false });
  };
  closeModalLogin = () => {
      this.setState({ login: false });
  };
  componentDidMount() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        this.currentUser= true;
      } else {
        this.currentUser= false;
      }
    });
  }
  render() {
    const { isAuthenticated, isAdmin  } = this.props;  
    const { login, sign } = this.state;
      return (<>
        <NavBack className="navbar navbar-expand-sm  navbar-dark px-sm-5"/>
        <Nav className="navbar navbar-expand-sm  navbar-dark px-sm-5">
          <ul className="navbar-nav align-items-center">
            <li className="nav-item ml-5 row">
              {isAdmin ?
                (
                  <>
                    <Link to="/" className="nav-link"><ButtonContainer>Product</ButtonContainer></Link>
                    <Link to="/order" className="nav-link"><ButtonContainer>Order</ButtonContainer></Link>
                  </>
                ):(
                  <>
                    <Link to="/" className="nav-link"><ButtonContainer>Product</ButtonContainer></Link>
                    {isAuthenticated &&
                      <Link to="/cart" className="nav-link">
                        <ButtonContainer>
                          <span  className="mr-2"><i className="fas fa-cart-plus "/></span>
                          my cart
                          </ButtonContainer>
                      </Link>
                    }
                  </>
                )
                }
            </li>
          </ul> 
          <Link to="/" className="ml-auto">
            </Link>
          {isAuthenticated?
            (
              <ButtonContainer id="btnLogout" onClick={() => {this.handleLogout();}}>
                Logout
              </ButtonContainer>
            ):(
              <>
                <ButtonContainer id="myCartButton" onClick={this.OpenModalLogin}> 
                  login
                </ButtonContainer>
                <ButtonContainer id="myCartButton" onClick={this.openModalSignUp}> 
                  sign up
                </ButtonContainer>
                <Modal open={sign} onClose={this.closeModalSignUp} center>
                  <div className="container text-center" id="modal">
                    <Title name="Sign" title="Up" className="container-fluid" />
                    <form action="">
                      <p>
                        <input className="form-control" id="txtSignName" type="text" placeholder="Name" onChange={this.handleSignUpNameChange}/>
                      </p>
                      <p>
                        <input className="form-control" id="txtSignEmail" type="email" placeholder="Email" onChange={this.handleSignUpEmailChange}/>
                      </p>
                      <p>
                        <input className="form-control" id="txtSignPassword" type="password" placeholder="Password" onChange={this.handleSignUpPasswordChange}/><br/>
                      </p>
                      <p>
                        <input className="form-control" tid="txtPassword" type="password" placeholder="Re-type Password" onChange={this.handleSignUpPassword2Change}/><br/>
                      </p>
                    </form>
                    <ButtonContainer onClick={this.handleSignUp}>
                      Sign Up
                    </ButtonContainer>
                  </div>
                </Modal>
                {}
                <Modal open={login} onClose={this.closeModalLogin} center>
                  <div className="modalCard text-center" id="modal">
                    <Title name="Log" title="In" className="container-fluid" />
                    <form action="">
                      <p>
                        <input className="form-control" id="txtEmail" type="email" placeholder="Email" onChange={this.handleEmailChange}/>
                      </p>
                      <p>
                        <input className="form-control" id="txtPassword" type="password" placeholder="Password" onChange={this.handlePasswordChange}/><br/>
                      </p>
                    </form>
                    <ButtonContainer onClick={this.handleSubmit}>
                      Login
                    </ButtonContainer>
                  </div>
                </Modal>
              </>
            )
          }
        </Nav>
        </>);
  }
  
  
} 
function mapStateToProps(state) {
  return {
      isLoggingIn: state.auth.isLoggingIn,
      loginError: state.auth.loginError,
      isLoggingOut: state.auth.isLoggingOut,
      logoutError: state.auth.logoutError,
      isAuthenticated: state.auth.isAuthenticated,
      isAdmin: state.auth.isAdmin,
      isVerifying: state.auth.isVerifying
  };
}
const Nav = styled.nav`
  position: fixed;
  left: 0;
  top: 0;
  height: 6%;
  width: 100%;
  z-index:99;
  .nav-link {
    color: var(--mainWhite) !important;
    font-size:1.3rem;
    text-transform:capitalize;
  }
  .modalCard {
    width:300px;
    height:300px;
  }
  @media (max-width: 576px) {
    .navbar-nav {
      flex-direction: row !important;
`;const NavBack = styled.nav`
  background:#000;
  position: fixed;
  left: 0;
  top: 0;
  height: 6%;
  width: 100%;
  z-index:98;
  opacity:10%;
`;

export default connect(mapStateToProps)(Navbar);
