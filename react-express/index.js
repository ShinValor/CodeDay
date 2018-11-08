const express = require('express')
const path = require('path')
const fs = require('fs')
const unirest = require('unirest')

const app = express()

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')))


app.get('/recipe', (req,res) => {
	var list = ["Chicken","Rice","Egg","Bacon"]
	res.json(list)
})

app.post('/recipe', (req,res) => {
	//var recipeName = req.body.recipeName
	//console.log("Passed RecipeName: ", recipeName)
	var list = ["Chicken","Rice","Egg","Bacon"]
	res.json(list)
})

app.get('/WebScrapedRecipe', (req,res) => {
	//var recipeName = req.body.recipeName
	//console.log("Passed RecipeName: ", recipeName)
	var list = ["webRecipe1", "webRecipe2", "webRecipe3"]
	res.json(list)
})

app.post('/WebScrapedRecipe', (req,res) => {
	var list = ["webRecipe1", "webRecipe2", "webRecipe3"]
	res.json(list)
})

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
	res.sendFile(path.join(__dirname+'/client/build/index.html'))
})

const port = process.env.PORT || 5000
app.listen(port)

console.log('App is listening on port ' + port)
