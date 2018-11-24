const express = require('express')
const path = require('path')
const unirest = require('unirest')
const bodyParser = require('body-parser')
const cors = require('cors')
const myApi = require('./spoonacularApi')

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


app.get('/recipe', (req,res) => {
	console.log("Recipe GET")
})


app.post('/recipe', (req,res) => {
	console.log("Recipe POST")
	var recipeName = req.body.recipeName
	console.log("Passed RecipeName:", recipeName)
	getRecipeByName(recipeName,function(listOfRecipes) {
		res.json(listOfRecipes)
	})
})


app.get('/scrapedRecipe', (req,res) => {
	console.log("Scrape GET")
})


app.post('/scrapedRecipe', (req,res) => {
	console.log("Scrape POST")
	var url = req.body.url
	console.log("Passed Url: ", url)
	scrapeRecipeByUrl("chefsavvy.com/the-best-fried-rice",function(data){
		res.json(data)
	})
})


app.get('/recipeInfo', (req,res) => {
	console.log("Recipe Info GET")
})


app.post('/recipeInfo', (req,res) => {
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


// Handles any requests that don't match the ones above
app.get('/*', (req,res) =>{
	res.sendFile(path.join(__dirname + '/client/public/index.html'))
})


console.log('App is listening on port ' + port)