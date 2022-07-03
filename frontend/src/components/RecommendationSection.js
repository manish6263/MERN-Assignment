import React, { useContext } from 'react';
import userContext from '../context/userContext';
import RecommendationCard from './RecommendationCard';
import { v4 as uuid } from 'uuid';

const RecommendationSection = () => {

    const { recommendations } = useContext(userContext);
    return (
        <div className="row container my-3 mx-auto recommendations">
            {
                recommendations.map((recommendation)=>(
                    <RecommendationCard key={uuid()} recommendation={recommendation} />
                ))
            }
        </div>
    )
}

export default RecommendationSection;