import { useState, useEffect } from "react";
import userContext from "./userContext";

const UserState = (props) => {

    const [recommendations, setRecommendations] = useState([]);

    //get all the recommendations......
    const getRecommendations = async () => {
        // console.log('inside get recommendation');
        let response = await fetch(
            'http://localhost:5000',
            {
                method: 'get'
            }
        );
        response = await response.json();
        console.log(response);
        if (response.isSuccessfull === true) {
            const recommendationArray = [];
            response.recommendations.map((recommendation) => {
                return recommendationArray.push(recommendation);
            });
            console.log(recommendationArray);
            setRecommendations(recommendationArray);
        }
    }

    useEffect(() => {
        getRecommendations();
        // eslint-disable-next-line
    }, [])

    //add recommendations.....
    const addRecommendation = (newRecommendation) => {
        setRecommendations([...recommendations, newRecommendation]);
    }

    //delete recommendations.......
    const deleteRecommendation = async (id) => {
        let response = await fetch(
            `http://localhost:5000/${id}`,
            {
                method: 'delete'
            }
        );
        response = await response.json();
        console.log(response);

        if (response.isSuccessfull === true) {
            return true;
        }
        else {
            return response.result;
        }
    }

    //update recommendations............
    const updateRecommendation = async (recommendation) => {

        let response = await fetch(
            `http://localhost:5000/${recommendation.id}`,
            {
                method: 'patch',
                body: JSON.stringify(recommendation),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        response = await response.json();
        console.log(response);
    }

    return (
        <userContext.Provider value={{ recommendations, addRecommendation, deleteRecommendation, updateRecommendation, getRecommendations }}>
            {props.children}
        </userContext.Provider>
    )

}

export default UserState;