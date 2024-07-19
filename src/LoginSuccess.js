import React, {useEffect} from "react";
import {useLocation} from "react-router-dom";
import axios from "axios";

const LoginSuccess = () => {
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        if (token) {
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    }, [location]);

    return (
        <div>
        <h1>Login Success</h1>
        </div>
    );
}
export default LoginSuccess;