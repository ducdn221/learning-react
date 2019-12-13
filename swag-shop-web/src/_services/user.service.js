// import config from 'config';
import {authHeader, handleResponse} from '../_helpers';

export const userService = {
    getAll
};

function getAll() {
    const requestOptions = { method: 'GET' , headers: authHeader() };
    // ${config.apiUrl}
    return fetch(`${process.env.REACT_APP_API_URL}/users/getUsers`, requestOptions).then(handleResponse);
}