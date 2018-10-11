const express = require('express');
const app = express();
const port = 3000;

// Rwo parameters: 
// 1 - route
// 2 - function to run when route is hit 

app.get('/', (req, res) => res.send('Hello World!'));


app.get('/whatever-you-want',(request,response) => {
	response.send('something else');
});


app.get('/users/:variableName', (request,response) => {
	const id = request.params.id;
	// Go Fetch me user with ID of id
	response.send(request.params);
});


// Route Parameters
app.get('/users/:id/profiles/:profileId', (request,response) => {
	response.send(request.params);
});


// Query Parameters
app.get('/watch', (req,res) => {
	res.send(req.query);
});


app.listen(port, function () {
	console.log(`Server is running on ${port} port`);
});

console.log('Hello world');