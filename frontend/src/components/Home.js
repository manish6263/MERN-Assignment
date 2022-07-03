import React, { useContext } from 'react';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import userContext from '../context/userContext';
import RecommendationSection from './RecommendationSection';

const Home = () => {

    const { addRecommendation } = useContext(userContext);
    const [recommendationForm, setRecommendationForm] = useState({
        name: '',
        email: '',
        company: '',
        designation: '',
        recommendationMessage: ''
    });

    const [messageData, setMessageData] = useState({
        submitMessageTextColor: '',
        submitMessage: ''
    });


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

    const onChange = (e) => {
        setRecommendationForm({ ...recommendationForm, [e.target.name]: e.target.value });
    }

    //form submitted.......
    const onSubmit = async (e) => {
        e.preventDefault();

        if (recommendationForm.name === '') {
            displayAlert('text-danger', 'Please enter your name');
            return false;
        }

        else if (recommendationForm.email === '') {
            displayAlert('text-danger', 'Please enter your email');
            return false;
        }

        else if (recommendationForm.company === '') {
            displayAlert('text-danger', 'Please enter your company or institution');
            return false;
        }

        else if (recommendationForm.designation === '') {
            displayAlert('text-danger', 'Please enter your designation');
            return false;
        }

        else {
            const id = uuid();
            const response = await fetch(
                'http://localhost:5000',
                {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: id,
                        name: recommendationForm.name,
                        email: recommendationForm.email,
                        company: recommendationForm.company,
                        designation: recommendationForm.designation,
                        recommendationMessage: recommendationForm.recommendationMessage,
                    })
                }
            );
            const data = await response.json();
            console.log(data.result);
            if (data.result === true) {

                const newRecommendation = {
                    id: id,
                    name: recommendationForm.name,
                    company: recommendationForm.company,
                    designation: recommendationForm.designation,
                    recommendationMessage: recommendationForm.recommendationMessage
                };
                addRecommendation(newRecommendation);
                displayAlert('text-success', `Thank you ${recommendationForm.name} for the recommendation! I really appreciate it.`);
                console.log('Recommendation form submitted');
                setRecommendationForm({
                    name: '',
                    email: '',
                    company: '',
                    designation: '',
                    recommendationMessage: ''
                });
            }
            else {
                displayAlert('text-danger', data.result);
            }
        }
    }

    return (
        <>
            <div className="container my-5 py-5">
                <h1 className="font-weight-light text-center py-5">
                    <span className="text-info">Thank you! </span>for your taking
                    your time
                </h1>
                <div className="row justify-content-center">
                    <div className="col-11 col-lg-5">
                        <form onSubmit={onSubmit}>
                            <div className="my-3">
                                <label htmlFor="name" className='form-label fw-semibold'>Name *</label>
                                <input
                                    id='name'
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    value={recommendationForm.name}
                                    onChange={onChange}
                                />
                            </div>
                            <div className="my-3">
                                <label htmlFor="email" className='form-label fw-semibold'>Email *</label>
                                <input
                                    id='email'
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    value={recommendationForm.email}
                                    onChange={onChange}
                                />
                            </div>
                            <div className="my-3">
                                <label htmlFor="company" className='form-label fw-semibold'>Company / Institution *</label>
                                <input
                                    id='company'
                                    type="text"
                                    className="form-control"
                                    value={recommendationForm.company}
                                    name="company"
                                    onChange={onChange}
                                ></input>
                            </div>
                            <div className="my-3">
                                <label htmlFor="designation" className='form-label fw-semibold'>Designation *</label>
                                <input
                                    id='designation'
                                    type="text"
                                    className="form-control"
                                    value={recommendationForm.designation}
                                    name="designation"
                                    onChange={onChange}
                                ></input>
                            </div>
                            <div className="my-3">
                                <label htmlFor="recommendationMessage" className='form-label fw-semibold'>
                                    Recommendation *
                                </label>
                                <textarea
                                    id='recommendationMessage'
                                    className="form-control"
                                    name="recommendationMessage"
                                    value={recommendationForm.recommendationMessage}
                                    rows="5"
                                    onChange={onChange}
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-danger float-end"
                            >
                                Lot's of love!
                            </button>
                        </form>
                    </div>
                </div>
                <div className="py-5 mx-2 text-center">
                    <h5 className={messageData.submitMessageTextColor}>{messageData.submitMessage}</h5>
                </div>
            </div>

            {/* Recommendations */}
            <RecommendationSection />
        </>
    )
}

export default Home;