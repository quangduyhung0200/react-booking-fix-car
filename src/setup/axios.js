import axios from "axios";
import { toast } from "react-toastify";
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
// Set config defaults when creating the instance
const instance = axios.create({
    baseURL: 'http://localhost:8080'
});

// Alter defaults after instance has been created
instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("jwt")}`;
// Add a request interceptor
instance.defaults.withCredentials = true
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("jwt")}`;
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
}, function (err) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const status = err && err.response && err.response.status || 500;
    switch (status) {
        // authentication (token related issues)
        case 401: {

            console.log('path name: ',)
            if (window.location.pathname !== '/vetyfy-booking' && window.location.pathname !== '/' && window.location.pathname !== '/login'
                && window.location.pathname !== '/resgister' && window.location.pathname !== '/allGara' && window.location.pathname.split("/")[1] !== 'detailHandbook'
                && window.location.pathname.split("/")[1] !== 'detailGara' && window.location.pathname !== '/allHandBook' && window.location.pathname.split("/")[1] !== 'allHandBook') {


                toast.error('you dont have authentication to accest')
                // window.location.href = '/login'

            }




            return err.response.data

        }

        // forbidden (permission related issues)
        case 403: {

            toast.error('you dont have permistions to access this resource')
            // window.location.href = '/login'
            return err.response.data
        }

        // bad request
        case 400: {
            return err.response.data
        }

        // not found
        case 404: {
            return err.response.data
        }

        // conflict
        case 409: {
            return err.response.data
        }

        // unprocessable
        case 422: {
            return err.response.data
        }

        // generic api error (server related) unexpected
        default: {
            return err.response.data
        }
    }

});


export default instance
