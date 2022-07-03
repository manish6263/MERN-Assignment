import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {

    const navigate = useNavigate();

    const [registerData, setRegisterData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [messageData, setMessageData] = useState({
        submitMessageTextColor: '',
        submitMessage: ''
    });

    const onChange = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value });
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


    // const requestUrl = 'http://localhost:5000/register';
    const onSubmit = async (e) => {
        e.preventDefault();

        if (registerData.password.length < 5) {
            displayAlert('text-danger', 'Password must be at least 5 characters');
            return false;
        }
        else {

            //POST request.........
            const response = await fetch(
                'http://localhost:5000/register',
                {
                    method: 'post',
                    // mode: 'no-cors',
                    body: JSON.stringify( registerData ),
                    headers: {
                        'content-Type': 'application/json'
                    }
                }
            );
            const answer = await response.json();
            console.log(answer);

            if(answer.result === 'success'){
                displayAlert('text-success', 'Registered successfully');
                setRegisterData({
                    name: '',
                    email: '',
                    password: ''
                });
                navigate('/');
            }
            else{
                displayAlert('text-danger', answer.result);
            }
        }
    }

    return (
        <div className="container py-5 my-5" style={{ maxWidth: '750px' }}>
            <h1 className="text-center my-5 fw-bold">
                Please <span className="text-info">Register</span>
            </h1>

            <div className="row px-3 px-lg-5">
                <form onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className='fw-semibold form-label'>Enter Name *</label>
                        <input
                            type="text"
                            name="name"
                            value={registerData.name}
                            id="name"
                            className="form-control"
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className='fw-semibold form-label'>Enter Email *</label>
                        <input
                            type="email"
                            name="email"
                            value={registerData.email}
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
                            value={registerData.password}
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
                            Register
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    <h5 className={messageData.submitMessageTextColor}>{messageData.submitMessage}</h5>
                </div>

                <div className="container my-5 py-5 d-flex justify-content-around align-items-center">
                    Already have an account ?
                    <Link to="/login" className="btn btn-danger">Login</Link>
                </div>
            </div>
        </div>
    )
}

export default Register;