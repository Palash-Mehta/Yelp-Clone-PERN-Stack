import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import RestaurantFinder from "../Apis/RestaurantFinder";

const UpdateRestaurant = () => {
    const params = useParams();
    let history = useHistory();
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("");   

    useEffect(() => {
        const fetchData = async () => {
          const response = await RestaurantFinder.get(`/${params.id}`);
          setName(response.data.data.restaurant.name);
          setLocation(response.data.data.restaurant.location);
          setPriceRange(response.data.data.restaurant.price_range);
        };
        fetchData();
      }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedRestaurant = await RestaurantFinder.put(`/${params.id}`, {
            name:name,
            location:location,
            price_range: priceRange,
        });
        history.push("/");
      };

    return (
        <div>
            <h1 className = "text-center">Update Restaurant</h1>
            <form action="">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} id="name" className="form-control" type = "text"></input>
                </div>

                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input value={location} onChange={(e) => setLocation(e.target.value)} id="location" className="form-control" type = "text"></input>
                </div>

                <div className="form-group">
                    <label htmlFor="price_range">Price Range</label>
                    <input value={priceRange} onChange={(e) => setPriceRange(e.target.value)} id="price_range" className="form-control" type = "number" min="1" max="5"></input>
                </div>
            </form>
                <div className="text-center">
                    <button type = "submit" onClick = {handleSubmit} className="btn btn-primary">Submit</button>
                </div>  
        </div> 
    );
};

export default UpdateRestaurant;