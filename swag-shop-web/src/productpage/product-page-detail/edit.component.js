// edit.component.js

import React, { Component } from "react";
import "./create.component.css";
import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";
import { productService } from "../../_services";
class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: {
        title: "",
        price: "",
        image: ""
      }
    };
  }

  componentDidMount() {
    productService
      .getProductById(this.props.match.params.id)
      .then(res => {
        this.setState({
          product: { title: res.title, price: res.price, image: res.image }
        });
      })
      .catch(function(error) {
      });
  }
  render() {
    // this.props.values = this.state.product;
    console.log(this.props);
    return (
      <div style={{ marginTop: 10 }}>
        <h3>Edit Product</h3>
        <Form noValidate>
          <div className="form-group">
            <label>Title: </label>
            {/* <Field
              name="title"
              type="text"
              render={({ field }) => (
                <input className="form-control" {...field} value={this.state.title || ''}/>
              )}
            /> */}
            <Field name="title" type="text">
              {({ field, form, meta }) => (
                <input className="form-control" {...field} />
              )}
            </Field>
            {this.props.touched.title && (
              <div className="invalid-error">{this.props.errors.title}</div>
            )}
          </div>
          <div className="form-group">
            <label>Price: </label>
            {/* <Field
              name="price"
              type="text"
              render={({ field }) => (
                <input className="form-control" {...field} value={this.state.price || ''} onChange={event => this.setState({product: {...this.state.product, price: event.target.value}})}/>
              )}
            /> */}
            <Field name="price" type="text">
              {({ field, form, meta }) => (
                <input className="form-control" {...field}/>
              )}
            </Field>
            {this.props.touched.price && (
              <div className="invalid-error">{this.props.errors.price}</div>
            )}
          </div>
          <div className="form-group">
            <label>Image: </label>
            <input type="text" className="form-control" />
          </div>
          <div className="form-group">
            <input type="submit" value="Update" className="btn btn-primary" />
          </div>
        </Form>
      </div>
    );
  }
}

const FormikForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues(props) {
    console.log(props);
    // return {
    //   title:"",
    //   price: "",
    //   image: ""
    // };
  },
 

  handleSubmit: (values, { props, setSubmitting, setStatus }) => {
    // setStatus();
    console.log(values);
    console.log(props);
    // productService.addProduct(values).then(
    //   data => {
    //     const { from } = props.location.state || {
    //       from: { pathname: "/product" }
    //     };
    //     props.history.push(from);
    //   },
    //   error => {
    //     setSubmitting(false);
    //     setStatus(error);
    //   }
    // );
  },

  validationSchema: Yup.object().shape({
    title: Yup.string()
      .required("Title is required")
      .min(5, "Title must have min 5 characters"),
    price: Yup.number()
      .typeError("Price must be a number")
      .required("Price is required")
  })
})(Edit);

export default FormikForm;
