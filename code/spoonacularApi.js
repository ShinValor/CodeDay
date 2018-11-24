/* Spoonacular Api */
const unirest = require('unirest')

module.exports = {

	getRecipeByName : function(food, callback) {
		var url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?query=" + food
		//console.log("URL: ",url)
		unirest.get(url)
		.header("X-Mashape-Key", "pSO0jwQNh4mshw7770dEVhfjWhMEp1XHwcKjsnCx2DHBSZ4q6C")
		.header("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com")
		.end(function (result) {
			//console.log(result.headers)
			if (result.status === 200) {
				var data = result.body
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
	},

	getRecipeInfoByID : function(id, callback) {
		var url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + id + "/information"
		//console.log("URL: ",url)
		unirest.get(url)
		.header("X-Mashape-Key", "pSO0jwQNh4mshw7770dEVhfjWhMEp1XHwcKjsnCx2DHBSZ4q6C")
		.header("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com")
		.end(function (result) {
			//console.log(result.headers)
			if (result.status === 200) {
				var data = result.body
				var ingredients = data['extendedIngredients']
				var instructions = data['instructions']
				var advInstructions = data['analyzedInstructions'][0]['steps']
				//console.log(ingredients)
				//console.log(instructions)
				//console.log(advInstructions)
				var data = []
				data.push(advInstructions)
				data.push(ingredients)
				callback(data)
			}
			else {
				throw err
			}
		})
	},

	scrapeRecipeByUrl : function(url,callback) {
		var url = url.split("/")
		//unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/extract?url=http%3A%2F%2Fwww.melskitchencafe.com%2Fthe-best-fudgy-brownies%2F")
		unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/extract?url=http%3A%2F%2F" + url[0] + "%2F" + url[1] +"%2F")
		.header("X-Mashape-Key", "pSO0jwQNh4mshw7770dEVhfjWhMEp1XHwcKjsnCx2DHBSZ4q6C")
		.header("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com")
		.end(function (result) {
			//console.log(result.headers)
			if (result.status === 200) {
				var data = result.body
				callback(data)
			}
			else {
				throw err
			}
		})
	},

	subIngredientsByName: function(ingredient,callback) {
		var url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/ingredients/substitutes?ingredientName=" + ingredient
		//console.log("URL: ",url)
		unirest.get(url)
		.header("X-Mashape-Key", "pSO0jwQNh4mshw7770dEVhfjWhMEp1XHwcKjsnCx2DHBSZ4q6C")
		.header("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com")
		.end(function (result) {
			//console.log(result.headers)
			if (result.status === 200) {
				var data = result.body
				var substitutes = data["substitutes"]
				var message = data["message"]
				//console.log(substitutes)
				//console.log(message)
				var data = []
				data.push(substitutes)
				data.push(message)
				callback(data)
			}
			else {
				throw err
			}
		})
	}	
}