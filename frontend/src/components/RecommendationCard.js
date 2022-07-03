import React, { useContext, useState } from 'react';
import userContext from '../context/userContext';

const RecommendationCard = ({ recommendation }) => {

    const { deleteRecommendation, getRecommendations, updateRecommendation } = useContext(userContext);

    const [recommendationForm, setRecommendationForm] = useState({
        id: '',
        name: '',
        email: '',
        company: '',
        designation: '',
        recommendationMessage: ''
    });

    const onChange = (e) => {
        setRecommendationForm({ ...recommendationForm, [e.target.name]: e.target.value });
    }

    const handleDelete = async () => {
        console.log('delete button clicked');
        let result = await deleteRecommendation(recommendation.id);
        console.log(result);
        getRecommendations();
    }

    const handleUpdate = () => {
        console.log('update button clicked');
        updateRecommendation(recommendationForm);
    }

    const getRecommendation = async () => {
        let response = await fetch(
            `http://localhost:5000/${recommendation.id}`,
            {
                method: 'get'
            }
        );
        response = await response.json();
        console.log(response);
        let fetchedrecommendation = response.recommendation;
        setRecommendationForm({
            id: fetchedrecommendation.id,
            name: fetchedrecommendation.name,
            email: fetchedrecommendation.email,
            company: fetchedrecommendation.company,
            designation: fetchedrecommendation.designation,
            recommendationMessage: fetchedrecommendation.recommendationMessage
        });
    }

    return (
        <>
            <div className="col-12 col-md-6 my-2" data-id={recommendation.id}>
                <div className="card shadow h-100">
                    <div className="card-body mx-auto">
                        <h4 className="card-text">{recommendation.recommendationMessage}</h4>
                        <p className="card-text text-secondary mb-0">{recommendation.name}</p>
                        <p className="card-text text-secondary">
                            {recommendation.designation} at {recommendation.company}
                        </p>
                    </div>
                    <div className="my-2 mx-auto">
                        <button className='border-0 bg-transparent text-success mx-2' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={getRecommendation}>
                            <i className="fas fa-edit"></i>
                        </button>
                        <button className='border-0 bg-transparent text-danger mx-2' onClick={handleDelete}>
                            <i className="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update Recommendation</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleUpdate}>
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
                </div>
            </div>
        </>
    )
}

export default RecommendationCard;