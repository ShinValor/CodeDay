const fs = require('fs')
const unirest = require('unirest')


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
			return callback(recipes)
		}
		else {
			throw err
		}
	})
}

/*
getRecipeByName("Steak",function(recipes){
	console.log(recipes)
})
*/

// Get me recipe instruction and ingredients
getRecipeInfoByID = (id, callback) => {
	var url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + id + "/information"
	//console.log("URL: ",url)
	unirest.get(url)
	.header("X-Mashape-Key", "pSO0jwQNh4mshw7770dEVhfjWhMEp1XHwcKjsnCx2DHBSZ4q6C")
	.header("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com")
	.end(function (result) {
		//console.log(result.headers)
		if (result.status === 200) {
			var data = result.body
			fs.writeFileSync("./jsonFiles/reciceInfo.json", JSON.stringify(data,null,2))
			var ingredients = data['extendedIngredients']
			var instructions = data['instructions']
			var advInstructions = data['analyzedInstructions'][0]['steps']
			//console.log(ingredients)
			//console.log(instructions)
			//console.log(advInstructions)
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

/*
getRecipeInfoByID("475182",function(data){
	console.log(data)
})
*/

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

/*
subIngredientsByName("butter",function(data){
	console.log(data)
})
*/

// Ingredient substitute by id
subIngredientsByID = (id,callback) => {
	var url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/ingredients/" + id + "/substitutes"
	//console.log("URL: ",url)
	unirest.get(url)
	.header("X-Mashape-Key", "pSO0jwQNh4mshw7770dEVhfjWhMEp1XHwcKjsnCx2DHBSZ4q6C")
	.header("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com")
	.end(function (result) {
		//console.log(result.headers)
		if (result.status === 200) {
			var data = result.body
			fs.writeFileSync("./jsonFiles/substitutesByID.json", JSON.stringify(data,null,2))
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

/*
subIngredientsByID("11297",function(data){
	console.log(data)
})
*/

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



