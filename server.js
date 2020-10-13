// Setup empty JS object to act as endpoint for all routes
const projectData = {};

const port = 8000;
const express = require('express');
const app = express();//get instance of the express

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

/* Initializing the main project folder */
app.use(express.static('website'));
/*
This line of code connects our server-side code (the code in the server.js file) to our client-side code (the browser code written in the files housed in the website folder).
*/
const server = app.listen(port, () => console.log(`listening to port ${port}`));


// Setup Server

// Callback to debug

// Initialize all route with a callback function

/**Routers */
app.post('/addData', (req, res) => {
    //console.log(res);
    projectData.temperature = req.body.temperature;
    projectData.date = req.body.date;
    projectData.userResponse = req.body.userResponse;

    //projectData.push(req.body);
    res.send(projectData);
});

app.get('/getData', (req, res) => {
    res.send(projectData);
});

// Callback function to complete GET '/all'

// Post Route
  