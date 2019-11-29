import React, { Component } from "react";
//Component
import Product from "../product/product";
import WishList from "../wishlist/wishlist";

//Service
import HttpService from "../services/http-service";
import { productService, authenticationService } from "../_services";

// const http = new HttpService();
class WishManager extends Component {
  constructor(props) {
    super(props);

    this.state = { products: [] };

    // this.loadData = this.loadData.bind(this);
    // this.productList = this.productList.bind(this);

    this.loadData();
  }

  loadData = function() {
    // http.getProducts().then(
    //   data => {
    //     this.setState({ products: data });
    //   },
    //   err => {}
    // );
    productService
      .getProducts()
      .then(data => this.setState({ products: data }));
  };

  productList = () => {
    const list = this.state.products.map(product => (
      <div className="col-sm-4" key={product._id}>
        <Product product={product} />
      </div>
    ));
    return list;
  };
  render() {
    return (
    //   <div className="App">
        <div className="container-fluid App-main">
          <div className="row">
            <div className="col-sm-8">
              <div className="row">{this.productList()}</div>
            </div>
            <div className="col-sm-4">
              <WishList />
            </div>
          </div>
        </div>
    //   </div>
    );
  }
}

export default WishManager;
