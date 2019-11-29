// getProducts = () => {
//     var promise = new Promise((resolve, reject) => {
//       fetch("http://localhost:3004/product").then(response => {
//         resolve(response.json());
//       });
//     });

//     return promise;
//   };

import {authHeader, handleResponse} from '../_helpers';

export const productService = {
    getProducts
};

function getProducts() {
    const requestOptions = { method: 'GET' , headers: authHeader() };
    // ${config.apiUrl}
    return fetch(`http://localhost:3004/product`, requestOptions).then(handleResponse);
}