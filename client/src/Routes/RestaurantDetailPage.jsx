import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { RestaurantContext } from '../Context/RestaurantContext';
import RestaurantFinder from '../Apis/RestaurantFinder';
import StarRating from '../Components/StarRating';
import Reviews from '../Components/Reviews';
import AddReview from '../Components/AddReview';

const RestaurantDetailPage = () => {
    const params = useParams();
    const {selectedRestaurant,setSelectedRestaurant} = useContext(RestaurantContext);

    useEffect(() => {
        const fetchData = async () =>{
            try{
                const response = await RestaurantFinder.get(`/${params.id}`);
                setSelectedRestaurant(response.data.data);
            }catch(err){
                console.log(err);
            }
       };
        fetchData();
    }, []);

    return (
        <div>
            {selectedRestaurant && (
                <>
                <h1 className="font-weight-light display-1 text-center">{selectedRestaurant.restaurant.name}</h1>
                <div className="text-center">
                    <StarRating rating={selectedRestaurant.restaurant.average_rating} />
                    <span className="text-warning ml-1">
                        {selectedRestaurant.restaurant.count
                        ? `(${selectedRestaurant.restaurant.count})`
                        : "(0)"}
                    </span>
                </div>
                <div className="mt-3">
                    <Reviews reviews = {selectedRestaurant.review}/>
                </div>
                <AddReview />
                </>
            )
            }
        </div>
    )
}

export default RestaurantDetailPage;
