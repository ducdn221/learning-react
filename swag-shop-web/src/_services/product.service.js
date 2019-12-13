// getProducts = () => {
//     var promise = new Promise((resolve, reject) => {
//       fetch("http://localhost:3004/product").then(response => {
//         resolve(response.json());
//       });
//     });

//     return promise;
//   };

import { authHeader, handleResponse } from "../_helpers";

export const productService = {
  getProducts,
  addProduct,
  deleteProduct
};

function getProducts() {
  const requestOptions = { method: "GET", headers: authHeader() };
  // ${config.apiUrl}
  return fetch(`${process.env.REACT_APP_API_URL}/product`, requestOptions).then(
    handleResponse
  );
}

function addProduct(object) {
  const requestOptions = { method: "POST", headers: authHeader(), body: JSON.stringify(object) };
  console.log(requestOptions);
  return fetch(`${process.env.REACT_APP_API_URL}/product`, requestOptions).then(
    handleResponse
  );
}

function deleteProduct(id) {
  const requestOptions = {method: "GET", header: authHeader() };
  return fetch(`${process.env.REACT_APP_API_URL}/product/delete/` + id, requestOptions).then(
    handleResponse
  );
}
