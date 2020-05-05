// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


// Start up an instance of app
const app = express()

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = process.env.SERVER_PORT || 8081;
app.listen(port,() =>
{
    console.log('server is running');
    console.log(`server is running on port ${port}`);
})


//get 
app.get('/getdata' , (req,res) =>
{
    res.send(projectData);
});


app.post('/postdata' , (req,res) =>
{
    projectData.temprature = req.body.temprature;
    projectData.date = req.body.date;
    projectData.userresponse = req.body.userresponse;

    res.send(projectData);
})