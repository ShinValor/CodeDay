const express = require('express');
const path = require('path');
const fs = require('fs');
const unirest = require('unirest');

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));


app.get('/home', (req,res) => {
	var list = ["item1", "item2", "item3"];
	res.json(list);
	console.log('Sent list of items');
});

app.get('/recipe', (req,res) => {
	var list = ["recipe1", "recipe2", "recipe3"];
	res.json(list);
	console.log('Unicorn');
});

app.get('/WebScrapedRecipe', (req,res) => {
	var list = ["webRecipe1", "webRecipe2", "webRecipe3"];
	res.json(list);
	console.log('Baby');
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
	res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
