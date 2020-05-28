import { connect } from "react-redux";
import { ButtonContainer } from "../style/Button";
import React, { Component } from "react";
import * as firebase from 'firebase';
import firebaseConfig from "../../firebase/firebase";

class ProductView extends Component {
    constructor(props){
    super(props);
    if (!firebase.apps.length) {
        firebase.initializeApp((firebaseConfig));
    }

    this.state = {
      productList: []
    }
    }

    getDataAPI = () => {                // fungsi untuk mengambil data dari API dengan penambahan sort dan order
      let ref = firebase.database().ref("/");
      ref.on("value", snapshot => {
          const state = snapshot.val();
          this.setState(state);   
      })
  }

    componentDidMount() {  
      this.getDataAPI();
      const userData = localStorage.getItem('user')
      console.log('LOGIN DATA : ',JSON.parse(userData))
  }
  

  deleteProductHandle = (asd) => {      
    var deleteData = firebase.database().ref().child("productList").child("3");
    return deleteData.remove();

  }

  addToChart  = (event) => {         
    console.log(event)
  }

  render() {
    const { isAdmin, isAuthenticated  } = this.props;  
    let list = this.state.productList.map(productList => {
      return (
          <div key={productList.uid} className="col-3 sizeactually p-3 my-2 mx-2 card text-capitalize text-center">
            <div className="mx-auto">
              <img
                src={productList.image}
                style={{ width: "100rem", heigth: "100rem" }}
                className="img-fluid mx-auto"
                alt=""
              />
            </div>
            <div className="mx-auto">
              <span className="d-lg-none"></span> {productList.brand}
            </div>
            <div className="mx-auto">
              <span className="d-lg-none"></span> {productList.name}
            </div>
            <div className="mx-auto">
              <strong>
                <span className="d-lg-none"></span> Rp {productList.price}
              </strong>
            </div>
            <div className="mx-auto">
              {isAdmin ? (
                <>
                <ButtonContainer onClick={() => 
                  { if (window.confirm('Delete this Product?')) this.deleteProductHandle(productList.uid) }}>
                  Delete
                </ButtonContainer>
                <ButtonContainer onClick={() => 
                  { if (window.confirm('Update this Product?')) this.updateProductHandle(productList.uid) }}>
                  Update
                </ButtonContainer>
                </>
              ):(
                <>
                  <a target="_blank" rel="noopener noreferrer" href={productList.spec}>
                    <ButtonContainer>Specification</ButtonContainer>
                  </a>
                  <ButtonContainer onClick={() => 
                    {isAuthenticated&& this.addToChart(productList.uid)}}>
                    Add To Cart
                  </ButtonContainer>
                </>
              )}
            </div>
          </div>
      )
    })
    return(
      <div className="row justify-content-md-center">
        {list}
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
      isAuthenticated: state.auth.isAuthenticated,
      isAdmin: state.auth.isAdmin
  };
}
export default connect(mapStateToProps)(ProductView);
