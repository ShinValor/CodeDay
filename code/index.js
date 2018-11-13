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
getRecipeByName = (food, callback) => {
	var url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?query=" + food
	//console.log("URL: ",url)
	unirest.get(url)
	.header("X-Mashape-Key", "pSO0jwQNh4mshw7770dEVhfjWhMEp1XHwcKjsnCx2DHBSZ4q6C")
	.header("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com")
	.end(function (result) {
		//console.log(result.headers)
		if (result.status === 200) {
			var data = result.body
			fs.writeFileSync("./jsonFiles/recipe.json", JSON.stringify(data,null,2))
			var recipes = []
			for (index in data['results']) {
				var recipeName = data['results'][index]['title']
				var recipeID = data['results'][index]['id']
				var obj = {};
				obj[recipeName] = recipeID;
				recipes.push(obj)
			}
			//console.log(recipes)
			callback(recipes)
		}
		else {
			throw err
		}
	})
}

// Enter url to get recipe
scrapeRecipeByUrl = (url,callback) => {
	var url = url.split("/")
	//unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/extract?url=http%3A%2F%2Fwww.melskitchencafe.com%2Fthe-best-fudgy-brownies%2F")
	unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/extract?url=http%3A%2F%2F" + url[0] + "%2F" + url[1] +"%2F")
	.header("X-Mashape-Key", "pSO0jwQNh4mshw7770dEVhfjWhMEp1XHwcKjsnCx2DHBSZ4q6C")
	.header("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com")
	.end(function (result) {
		//console.log(result.headers)
		if (result.status === 200) {
			var data = result.body
			fs.writeFileSync("./jsonFiles/scrapeRecipe.json", JSON.stringify(data,null,2))
			return callback(data)
		}
		else {
			throw err
		}
	})
}

/*
scrapeRecipeByUrl("chefsavvy.com/the-best-fried-rice",function(data){
	console.log(data)
})
*/


// Get me recipe instruction and ingredients
getInstructionByID = (id, callback) => {
	var url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + id + "/information"
	//console.log("URL: ",url)
	unirest.get(url)
	.header("X-Mashape-Key", "pSO0jwQNh4mshw7770dEVhfjWhMEp1XHwcKjsnCx2DHBSZ4q6C")
	.header("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com")
	.end(function (result) {
		//console.log(result.headers)
		if (result.status === 200) {
			var data = result.body
			fs.writeFileSync("./jsonFiles/instruction.json", JSON.stringify(data,null,2))
			var ingredients = data['extendedIngredients']
			var instructions = data['instructions']
			var advInstructions = data['analyzedInstructions'][0]['steps']
			//console.log(ingredients)
			//console.log(instructions)
			//console.log(advInstructions)
			var data = []
			data.push(advInstructions)
			data.push(ingredients)
			return callback(data)
		}
		else {
			throw err
		}
	})
}


// Ingredient substitute by name
subIngredientsByName = (ingredient,callback) => {
	var url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/ingredients/substitutes?ingredientName=" + ingredient
	//console.log("URL: ",url)
	unirest.get(url)
	.header("X-Mashape-Key", "pSO0jwQNh4mshw7770dEVhfjWhMEp1XHwcKjsnCx2DHBSZ4q6C")
	.header("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com")
	.end(function (result) {
		//console.log(result.headers)
		if (result.status === 200) {
			var data = result.body
			fs.writeFileSync("./jsonFiles/substitutesByName.json", JSON.stringify(data,null,2))
			var substitutes = data["substitutes"]
			var message = data["message"]
			//console.log(substitutes)
			//console.log(message)
			var data = []
			data.push(substitutes)
			data.push(message)
			return callback(data)
		}
		else {
			throw err
		}
	})
}


app.get('/recipe', (req,res) => {
	console.log("Recipe GET")
	// Nothing
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
	// Nothing
})

app.post('/scrapedRecipe', (req,res) => {
	console.log("Scrape POST")
	var listOfRecipes = ["webRecipe1", "webRecipe2", "webRecipe3"]
	res.json(listOfRecipes)
})

app.get('/recipeInfo', (req,res) => {
	console.log("Recipe Info GET")
	// Nothing
})

app.post('/recipeInfo', (req,res) => {
	console.log("Recipe Info POST")
	if (req.body.recipeID) {
		var recipeID = req.body.recipeID
		console.log("Recipe ID:", recipeID)
		getInstructionByID(recipeID,function(data){
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
app.get('*', (req,res) =>{
	console.log("Wrong Path")
	res.sendFile(path.join(__dirname + '/client/public/index.html'))
})

console.log('App is listening on port ' + port)
