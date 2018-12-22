const express = require('express')
const path = require('path')
const unirest = require('unirest')
const bodyParser = require('body-parser')
const cors = require('cors')
const myApi = require('./spoonacular')

const corsOptions = {
  credentials: true,
  origin: true
}

const app = express()

const port = process.env.PORT || 5000

app.listen(port)


// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')))

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) 


let getRecipeByName = myApi.getRecipeByName
let scrapeRecipeByUrl = myApi.scrapeRecipeByUrl
let getRecipeInfoByID = myApi.getRecipeInfoByID
let subIngredientsByName = myApi.subIngredientsByName
let chatBot = myApi.chatBot

app.get('/recipe', (req,res) => {
	console.log("Recipe GET")
})


app.post('/recipe', (req,res) => {
	console.log("Recipe POST")
	var recipeName = req.body.recipeName
	console.log("Passed RecipeName:", recipeName)
	getRecipeByName(recipeName,function(data) {
		res.json(data)
	})
})


app.get('/url_Recipe', (req,res) => {
  console.log("Url GET")
})


app.post('/url_Recipe', (req,res) => {
	console.log("Url POST")
	var url = req.body.url
	console.log("Passed Url:", url)
	scrapeRecipeByUrl(url,function(data){
		res.json(data)
	})
})


app.get('/recipe_info', (req,res) => {
	console.log("Recipe Info GET")
})


app.post('/recipe_info', (req,res) => {
	console.log("Recipe Info POST")
	if (req.body.recipeID) {
		var recipeID = req.body.recipeID
		console.log("Recipe ID:", recipeID)
		getRecipeInfoByID(recipeID,function(data){
			res.json(data)
		})
	}
	else if (req.body.ingredient){
		var ingredient = req.body.ingredient
		console.log("Ingredient:", ingredient)
		subIngredientsByName(ingredient,function(data){
			res.json(data)
		})
	}
})

app.post('/message', (req,res) => {
    console.log("Message POST")
    var message = req.body.message
    console.log("Passed message:", message)
    chatBot(message,function(data){
        res.json(data)
    })
})


// Handles any requests that don't match the ones above
app.get('/*', (req,res) =>{
  res.sendFile(path.join(__dirname + '/client/public/index.html'))
})

console.log('App is listening on port ' + port)