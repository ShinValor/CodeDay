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
			callback(recipes)
		}
		else {
			throw err
		}
	})
}

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
			var instruction = data['instructions']
			//console.log(instruction)
			var advInstruction = data['analyzedInstructions'][0]['steps']
			//console.log(advInstruction)
			var data = []
			data.push(advInstruction)
			data.push(ingredients)
			return callback(data)
		}
		else {
			throw err
		}
	})
}

app.get('/recipe', (req,res) => {
	console.log("Recipe GET")
	var listOfRecipes = ["Chicken","Rice","Egg","Bacon"]
	res.json(listOfRecipes)
})

app.post('/recipe', (req,res) => {
	console.log("Recipe POST")
	var recipeName = req.body.recipeName
	console.log("Passed RecipeName:", recipeName)
	getRecipeByName(recipeName,function(listOfRecipes) {
		res.json(listOfRecipes)
	})
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

app.get('/recipeInfo', (req,res) => {
	console.log("RecipeInfo GET")
	// Nothing
})

app.post('/recipeInfo', (req,res) => {
	console.log("RecipeInfo POST")
	var recipeID = req.body.recipeID
	console.log("Recipe ID:", recipeID)
	getInstructionByID(recipeID,function(data){
		console.log(data)
		res.json(data)
	})	
})

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
	console.log("Nothing")
	res.sendFile(path.join(__dirname+'/client/build/index.html'))
})

console.log('App is listening on port ' + port)
