import React, { Component } from "react";
import Title from "../style/Title";
import ProductView from "./ProductView";
import ProductInsert from "./ProductInsert";
import { connect } from "react-redux";
class ProductIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
        currentUser: null,
        sign: false,
        login: false
    };
  }

  render() {
    const { isAdmin  } = this.props;
    if(isAdmin){
      return (
        <div className="container"><br/>
          <div className="row">
            <div className="col-3">
              <Title name="Insert"/>
              <ProductInsert />
            </div>
            <div className="col-9">
              <Title name="Product" title="List" />
              <ProductView />
              </div>
          </div>        
        </div>
      );
    }else{
      return(
      <div className="container"><br/>
        <Title name="Product" title="List" />
        <ProductView />
      </div>
      );
    }
    
  }
}
function mapStateToProps(state) {
  return {
      isAuthenticated: state.auth.isAuthenticated,
      isAdmin: state.auth.isAdmin
  };
}

export default connect(mapStateToProps)(ProductIndex );
export const Insert = (ProductIndex );
export const View = connect(mapStateToProps)(ProductIndex );
