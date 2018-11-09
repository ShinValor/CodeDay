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

getRecipeByName("Steak",function(recipes){
	console.log(recipes)
})


// Get me recipe ingredients
getIngredientsByName = (food) => {

}

// Get me recipe instruction
getInstructionByID = (id) => {
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
			var instruction = data['instructions']
			//console.log(instruction)
			var advInstruction = data['analyzedInstructions'][0]['steps']
			//console.log(advInstruction)
			return instruction,advInstruction
		}
		else {
			throw err
		}
	})
}

// Ingredient substitute by name
subIngredientsByName = (ingredient) => {
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
			//console.log(substitutes)
			var message = data["message"]
			//console.log(message)
			return substitutes
		}
		else {
			throw err
		}
	})
}

// Ingredient substitute by id
subIngredientsByID = (id) => {
	var url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/ingredients/" + id + "/substitutes"
	unirest.get(url)
	.header("X-Mashape-Key", "pSO0jwQNh4mshw7770dEVhfjWhMEp1XHwcKjsnCx2DHBSZ4q6C")
	.header("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com")
	.end(function (result) {
		//console.log(result.headers)
		if (result.status === 200) {
			var data = result.body
			fs.writeFileSync("./jsonFiles/substitutesByID.json", JSON.stringify(data,null,2))
			var substitutes = data["substitutes"]
			//console.log(substitutes)
			var message = data["message"]
			//console.log(message)
		}
		else {
			throw err
		}
	})
}

// Enter url to get recipe
scrapeRecipeByUrl = (url) => {
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

		}
		else {
			throw err
		}
	})
}


//getRecipeByName("Steak") // Done
//getIngredientsByName()
//getInstructionByID("475182")
//subIngredientsByName("butter") // Done
//subIngredientsByID(11297) // Done
//scrapeRecipeByUrl("chefsavvy.com/the-best-fried-rice")


