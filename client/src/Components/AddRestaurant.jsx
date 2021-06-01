import React, { useState , useContext } from 'react';
import RestaurantFinder from '../Apis/RestaurantFinder';
import { RestaurantContext } from "../Context/RestaurantContext";

const AddRestaurant = () => {
    const {addRestaurants} = useContext(RestaurantContext);
    const [name, setName] = useState("");
    const [location, setlocation] = useState("");
    const [priceRange, setPriceRange] = useState("Price Range");

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const response = await RestaurantFinder.post("/",{
                name : name,
                location: location,
                price_range : priceRange
            });
            addRestaurants(response.data.data.restaurant)
        }catch (err){
            console.log(err)
        }
    };

    return (
        <div className='mb-4'>
            <form action=''>
                <div className='form-row'>
                    <div className='col'>
                        <input type="text" 
                               required="required"
                               value = {name} 
                               onChange={(e) => setName(e.target.value)} 
                               className='form-control' 
                               placeholder="name"/>
                    </div>
                    <div className='col'>
                        <input type="text" 
                               required="required"
                               value = {location} 
                               onChange={(e) => setlocation(e.target.value)}
                               className='form-control' 
                               placeholder="location"/>
                    </div>
                    <div className="col">
                        <select value = {priceRange} 
                                onChange={(e) => setPriceRange(e.target.value)}
                                className='custom-select my-1 mr-sm-2'>
                        <option disabled>Price Range</option>
                            <option value="1">$</option>
                            <option value="2">$$</option>
                            <option value="3">$$$</option>
                            <option value="4">$$$$</option>
                            <option value="5">$$$$$</option>
                        </select>
                    </div>
                    <button onClick = {handleSubmit} type = "submit" className="btn btn-primary">Add</button>
                </div>
            </form>
        </div>
    )
}

export default AddRestaurant
