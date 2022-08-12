import axios from 'axios'
import React from 'react'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../../components/utils/config'
import { AuthContext } from '../../context/AuthContext'
import './loginPage.scss'

const LoginPage = () => {

    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
    })

    const { loading, error, dispatch } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post(`${API_URL}/api/auth/login`, credentials);
            dispatch({
                type:
                    "LOGIN_SUCCESS",
                payload: res.data.details
            });
            navigate("/")
        } catch (err) {
            dispatch({
                type:
                    "LOGIN_FAILED",
                payload: { message: "Wrong password or username!" },
            })
        }
    }

    return (
        <div className='loginPage'>
            <img src="https://www.tripsavvy.com/thmb/9UCe7bHm9MK9s_UO1nr_FcN-bKE=/5095x3383/filters:fill(auto,1)/usa--oregon--bend--illuminated-tent-by-lake-in-mountains-sb10070057l-001-5c3f91f746e0fb00012b9a84.jpg" alt="" />
            <div className="loginContainer">
                <input
                    type="text"
                    id='username'
                    placeholder='Username'
                    onChange={handleChange}
                />
                <input
                    type="password"
                    id='password'
                    placeholder='Password'
                    onChange={handleChange}
                />
                <div className="btns">
                    <button className="submitBtn" onClick={() => navigate('/')}>Back</button>
                    <button disabled={loading} className="submitBtn" onClick={handleClick}>Sign in</button>
                </div>

            </div>
            {error && <span>{error.message}</span>}
        </div>
    )
}

export default LoginPage