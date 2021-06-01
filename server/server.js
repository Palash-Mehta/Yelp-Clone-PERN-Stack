const express = require('express');
require('dotenv').config();
const db = require('./db');
const cors = require('cors');


//CREATE AN INSTANCE OF EXPRESS
const app = express();
app.use(cors());
app.use(express.json());


//CREATE A RESTAURANT
app.post('/api/v1/restaurants', async (request,response)=>{
    try{
        parameters = request.body;
        const result = await db.query("INSERT INTO restaurants(name,location,price_range) VALUES ($1,$2,$3) returning *",[parameters.name,parameters.location,parameters.price_range]);
        response.status(200)
        .json({
            status : "success",
            data : {
                restaurant : result.rows[0]
            }
        });
    }catch (err){
        console.log(err);
    };
});


//GET ALL RESTAURANTS
app.get('/api/v1/restaurants', async (request,response)=>{
    try{ 
        const result = await db.query("select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id;");
        response.status(200)
        .json({
            status : "success",
            number_of_rows_returned : result.rows.length,
            data : {
                restaurant : result.rows
            }
        });
    }catch(err){
        console.log(err);
    };
});


//GET ONE RESTAURANT WITH SPECIFIED ID
app.get('/api/v1/restaurants/:id', async (request,response)=>{
    try{ 
        const result = await db.query("select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id = $1",[request.params.id])
        const reviews = await db.query("SELECT * FROM reviews WHERE restaurant_id=$1",[request.params.id])
        response.status(200)
        .json({
            status : "success",
            data : {
                restaurant : result.rows[0],
                review : reviews.rows
                }
            });
    }catch(err){
        console.log(err);
    };
});


//UPDATE A RESTAURANT WITH GIVEN ID
app.put('/api/v1/restaurants/:id', async (request,response)=>{
    try{
        parameters = request.body
        const result = await db.query("UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning *",[parameters.name,parameters.location,parameters.price_range,request.params.id]);
        response.status(200)
        .json({
            status : "success",
            data : {
                restaurant : result.rows[0]
            }
        });
    }catch (err){
        console.log(err);
    };
});


//DELETE A RESTAURANT WITH GIVEN ID
app.delete('/api/v1/restaurants/:id',async (request,response)=>{
    try{
        const result = await db.query("DELETE FROM restaurants WHERE id=$1",[request.params.id]);
        response.status(204)
        .json({
            status : "success"
        })
    }catch(err){
        console.log(err);
    };
});

//CREATE A REVIEW FOR GIVEN RSTAURANT ID
app.post('/api/v1/restaurants/:id/addReview',async (request,response)=>{
    try{
        const newReview = await db.query("INSERT INTO reviews(restaurant_id,name,review,rating)VALUES($1,$2,$3,$4) returning *",
        [request.params.id,request.body.name,request.body.review,request.body.rating]);
        response.status(201)
        .json({
            status: "success",
            data :{
                review : newReview.rows[0]
            }   
        })
    }catch (err){
        console.log(error);
    };
});


//DEFINE PORT FOR THE SERVER
const portNumber = process.env.PORT_NUMBER || 3080;
app.listen(portNumber, () => {
    console.log(`Server is running on port ${portNumber}`);
}); 