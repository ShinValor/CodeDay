const express = require('express')
const path = require('path')
const fs = require('fs')
const unirest = require('unirest')
const bodyParser = require('body-parser')
const cors = require('cors')

const corsOptions = {
    credentials: true,
    origin: true
}

const app = express()

const port = process.env.PORT || 3001
app.listen(port)

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')))

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/recipe', (req,res) => {
	console.log("Recipe GET")
	var listOfRecipes = ["Chicken","Rice","Egg","Bacon"]
	res.json(listOfRecipes)
})

app.post('/recipe', (req,res) => {
	console.log("Recipe POST")
	var recipeName = req.body.recipeName
	console.log("Passed RecipeName: ", recipeName)
	var listOfRecipes = []
	listOfRecipes.push(recipeName)
	res.json(listOfRecipes)
})

app.get('/webScrapedRecipe', (req,res) => {
	console.log("Web GET")
	var listOfRecipes = ["webRecipe1", "webRecipe2", "webRecipe3"]
	res.json(listOfRecipes)
})

app.post('/webScrapedRecipe', (req,res) => {
	console.log("Web POST")
	var listOfRecipes = ["webRecipe1", "webRecipe2", "webRecipe3"]
	res.json(listOfRecipes)
})

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
	console.log("Nothing")
	res.sendFile(path.join(__dirname+'/client/build/index.html'))
})

console.log('App is listening on port ' + port)
