// import config from 'config';
import {authHeader, handleResponse} from '../_helpers';

export const userService = {
    getAll
};

function getAll() {
    const requestOptions = { method: 'GET' , headers: authHeader() };
    // ${config.apiUrl}
    return fetch(`http://localhost:3004/users/getUsers`, requestOptions).then(handleResponse);
}