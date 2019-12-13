import React, { Component } from "react";
import { productService } from "../_services";
import { Link } from "react-router-dom";
class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = { products: [] };

    this.loadData();
  }

  loadData = function() {
    productService
      .getProducts()
      .then(data => this.setState({ products: data }));
  };

  deleteProduct(id) {
    productService.deleteProduct(id).then(info => {
      console.log(info);
    })
  }
  render() {
    return (
      <div>
        {/* <a className="btn btn-success float-right mb-2">Add New</a> */}
        <Link to={"/create"} className="btn btn-success float-right mb-2">
          Add New
        </Link>
        <table className="table table-striped" style={{width: 80 + 'rem'}}>
          <thead className="thead-dark">
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Title</th>
              <th scope="col">Price</th>
              <th scope="col" style={{width: 10 + 'rem'}}>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.products.map(product => (
              <tr>
                <td>
                  <img
                    alt="Product Img"
                    src={product.imgUrl}
                    height="50"
                    width="auto"
                  ></img>
                </td>
                <td>{product.title}</td>
                <td>${product.price}</td>
                <td>
                  <a className="btn btn-primary">Edit</a>{" "}
                  {/* <Link to={"/edit/"+this.props.obj._id} className="btn btn-primary">Edit</Link> */}
                  <a className="btn btn-danger" onClick={this.deleteProduct.bind(this,product._id)}>Delete</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ProductPage;
