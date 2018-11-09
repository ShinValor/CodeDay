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


// Get me some recipes
crawl = (food) => {
	var url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?query=" + food
	//console.log("URL: ",url)
	unirest.get(url)
	.header("X-Mashape-Key", "pSO0jwQNh4mshw7770dEVhfjWhMEp1XHwcKjsnCx2DHBSZ4q6C")
	.header("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com")
	.end(function (result) {
		//console.log(result.headers)
		if (result.status === 200){
			var data = result.body;
			//data = JSON.stringify(data,null,2);
			recipes = []
			var count = 10
			while (count > 0)
			{
				recipes.push()
				count -= 1;
			}
			return data
		}
		else{
			throw err;
		}
	});
}



app.get('/recipe', (req,res) => {
	console.log("Recipe GET")
	var recipeName = req.body.recipeName
	console.log("Passed RecipeName: ", recipeName)
	var listOfRecipes = ["Chicken","Rice","Egg","Bacon"]
	res.json(listOfRecipes)
})

app.post('/recipe', (req,res) => {
	console.log("Recipe POST")
	var recipeName = req.body.recipeName
	console.log("Passed RecipeName: ", recipeName)
	var listOfRecipes = ["Chicken","Rice","Egg","Bacon"]
	res.json(listOfRecipes)
})

app.get('/webScrapedRecipe', (req,res) => {
	console.log("Web GET")
	var recipeName = req.body.recipeName
	console.log("Passed RecipeName: ", recipeName)
	var listOfRecipes = ["webRecipe1", "webRecipe2", "webRecipe3"]
	res.json(listOfRecipes)
})

app.post('/webScrapedRecipe', (req,res) => {
	console.log("Web POST")
	var recipeName = req.body.recipeName
	console.log("Passed RecipeName: ", recipeName)
	var listOfRecipes = ["webRecipe1", "webRecipe2", "webRecipe3"]
	res.json(listOfRecipes)
})

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
	console.log("Nothing")
	res.sendFile(path.join(__dirname+'/client/build/index.html'))
})

console.log('App is listening on port ' + port)
