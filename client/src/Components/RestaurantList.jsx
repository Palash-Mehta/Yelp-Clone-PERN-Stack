import React, {useEffect, useContext} from 'react';
import RestaurantFinder from '../Apis/RestaurantFinder'
import {RestaurantContext} from '../Context/RestaurantContext'
import { useHistory } from "react-router-dom";
import StarRating from "./StarRating";

const RestaurantList = (props) => {
    const { restaurants, setRestaurants } = useContext(RestaurantContext)
    let history = useHistory();
    useEffect(() => {
        const fetchData = async() => {
            try{
                const response = await RestaurantFinder.get('/');
                setRestaurants(response.data.data.restaurant)
            }catch (err){
                console.log(err);
            }
        };
        fetchData();         
    }, []);

    const handleDelete = async (e, id) =>{
        e.stopPropagation();
        try {
            const response = RestaurantFinder.delete(`/${id}`);
            setRestaurants(restaurants.filter(restaurant => {
                return restaurant.id !== id
            }));
        } catch (err) {
            console.log(err);
        }
    }; 

    const handleUpdate = (e, id) =>{
        e.stopPropagation();
        try{
            history.push(`/restaurants/${id}/update`);
        }catch (err){
            console.log(err);
        }
    };

    const handleRestaurantSelect = (id) => {
        history.push(`/restaurants/${id}`);
      };

    const renderRating = (restaurant) =>{
        if (restaurant.count == null){
            return (
                <span>No Reviews</span>
            )
        }else{
            return (
                <>
                    <StarRating rating = {restaurant.average_rating}/>
                    <span className="text-warning"> ({restaurant.count}) </span>
                </>
            )
        } 
    }


    return (
           <div className="list-group">
                <table className="table table-hover table-dark">
                    <thead>
                        <tr className="bg-primary">
                            <th scope="col">Restaurant</th>
                            <th scope="col">Location</th>
                            <th scope="col">Price Range</th>
                            <th scope="col">Ratings</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {restaurants && restaurants.map((restaurant) =>{
                            return(
                                <tr key={restaurant.id} onClick={() => handleRestaurantSelect(restaurant.id)}> 
                                    <td>{restaurant.name}</td>
                                    <td>{restaurant.location}</td>
                                    <td>{'$'.repeat(restaurant.price_range)}</td>
                                    <td>{renderRating(restaurant)}</td>
                                    <td><button onClick={(e) => handleUpdate(e, restaurant.id)} className="btn btn-warning">Edit</button></td>
                                    <td><button onClick={(e) => handleDelete(e, restaurant.id)} className="btn btn-danger">Delete</button></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table> 
        </div>
    )
}

export default RestaurantList
