import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {


    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const [messageData, setMessageData] = useState({
        submitMessageTextColor: '',
        submitMessage: ''
    });

    const onChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    }

    //display alert..........
    const displayAlert = (textColor, message) => {
        setMessageData({
            submitMessageTextColor: textColor,
            submitMessage: message
        });

        setTimeout(() => {
            setMessageData({
                submitMessageTextColor: '',
                submitMessage: ''
            });
        }, 3000);
    }


    const onSubmit = async (e) => {
        e.preventDefault();


        //POST request.........
        let response = await fetch(
            'http://localhost:5000/login',
            {
                method: 'post',
                // mode: 'no-cors',
                body: JSON.stringify( loginData ),
                headers: {
                    'content-Type': 'application/json'
                }
            }
        );
        response = await response.json();
        console.log(response);

        if(response.result === 'success'){
            displayAlert('text-success', 'Login successfully');
            setLoginData({
                email: '',
                password: ''
            });
            navigate('/');
        }
        else{
            displayAlert('text-danger', response.result);
        }
    }

    return (
        <div className="container py-5 my-5" style={{ maxWidth: '750px' }}>
            <h1 className="text-center my-5 fw-bold">
                Please <span className="text-info">Login</span>
            </h1>

            <div className="row px-3 px-lg-5">
                <form onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className='fw-semibold form-label'>Enter Email *</label>
                        <input
                            type="email"
                            name="email"
                            value={loginData.email}
                            id="email"
                            className="form-control"
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className='fw-semibold form-label'>Password *</label>
                        <input
                            type="password"
                            name="password"
                            value={loginData.password}
                            id="password"
                            className="form-control"
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className="text-center my-5">
                        <button
                            type="submit"
                            className="btn btn-dark m-auto"
                            style={{ backgroundColor: "green", width: '40%' }}
                        >
                            Login
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    <h5 className={messageData.submitMessageTextColor}>{messageData.submitMessage}</h5>
                </div>

                <div className="container my-5 py-5 d-flex justify-content-around align-items-center">
                    <Link to="/forgot-password">
                        <p className="text-danger fw-bold">Forgot Password</p>
                    </Link>
                    <div>
                        Don't have account ? 
                        <Link to="/register" className="btn btn-danger"> Please Register</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;