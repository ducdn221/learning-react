// create.component.js

import React, { Component } from "react";
import "./create.component.css";
import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";
import { productService } from "../../_services";
class Create extends Component {
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
  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3>Add New Product</h3>
        <Form noValidate>
          <div className="form-group">
            <label>Title: </label>
            <Field
              name="title"
              type="text"
              render={({ field }) => (
                <input className="form-control" {...field} />
              )}
            />
            {this.props.touched.title && (
              <div className="invalid-error">{this.props.errors.title}</div>
            )}
          </div>
          <div className="form-group">
            <label>Price: </label>
            <Field
              name="price"
              type="text"
              render={({ field }) => (
                <input className="form-control" {...field} />
              )}
            />
            {this.props.touched.price && (
              <div className="invalid-error">{this.props.errors.price}</div>
            )}
          </div>
          <div className="form-group">
            <label>Image: </label>
            <input type="text" className="form-control" />
          </div>
          <div className="form-group">
            <input type="submit" value="Add" className="btn btn-primary" />
          </div>
        </Form>
      </div>
    );
  }
}

const FormikForm = withFormik({
  mapPropsToValues() {
    return {
      title: "",
      price: "",
      image: ""
    };
  },
  handleSubmit: (values, {props, setSubmitting, setStatus }) => {
    setStatus();
    productService.addProduct(values).then(data => {
      const { from } = props.location.state || {
        from: {pathname: '/product'}
      };
      props.history.push(from);
    },
    error => {
      setSubmitting(false);
      setStatus(error)
    });
  },

  validationSchema: Yup.object().shape({
    title: Yup.string()
      .required("Title is required")
      .min(5, "Title must have min 5 characters"),
    price: Yup.number()
      .typeError("Price must be a number")
      .required("Price is required")
  })
})(Create);

export default FormikForm;
