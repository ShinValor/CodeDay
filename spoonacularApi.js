/* Spoonacular Api */
const unirest = require('unirest')

module.exports = {

	getRecipeByName : function(food, callback) {
		const url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?query=" + encodeURI(food)
		unirest.get(url)
		.header("X-Mashape-Key", "pSO0jwQNh4mshw7770dEVhfjWhMEp1XHwcKjsnCx2DHBSZ4q6C")
		.header("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com")
		.end(function (result) {
			//console.log(result.headers)
			if (result.status === 200) {
				var recipes = []
				for (index in result.body['results']) {
					var recipeName = result.body['results'][index]['title']
					var recipeID = result.body['results'][index]['id']
					recipes.push({[recipeName]:recipeID})
				}
				callback(recipes)
			}
			else {
				throw err
			}
		})
	},

	getRecipeInfoByID : function(id, callback) {
		const url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + encodeURI(id) + "/information"
		unirest.get(url)
		.header("X-Mashape-Key", "pSO0jwQNh4mshw7770dEVhfjWhMEp1XHwcKjsnCx2DHBSZ4q6C")
		.header("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com")
		.end(function (result) {
			//console.log(result.headers)
			if (result.status === 200) {
				var ingredients = result.body['extendedIngredients']
				var instructions = result.body['analyzedInstructions'][0]['steps']
				callback([instructions,ingredients])
			}
			else {
				throw err
			}
		})
	},

	scrapeRecipeByUrl : function(url,callback) {
		//unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/extract?url=http%3A%2F%2Fwww.melskitchencafe.com%2Fthe-best-fudgy-brownies%2F")
		unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/extract?url=http%3A%2F%2F" + encodeURI(url))
		.header("X-Mashape-Key", "pSO0jwQNh4mshw7770dEVhfjWhMEp1XHwcKjsnCx2DHBSZ4q6C")
		.header("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com")
		.end(function (result) {
			//console.log(result.headers)
			if (result.status === 200) {
				var title = result.body['title']
				var ingredients = result.body['extendedIngredients']
				var instructions = result.body['analyzedInstructions'][0]['steps']
				callback([title,instructions,ingredients])
			}
			else {
				throw err
			}
		})
	},

	subIngredientsByName: function(ingredient,callback) {
		const url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/ingredients/substitutes?ingredientName=" + encodeURI(ingredient)
		unirest.get(url)
		.header("X-Mashape-Key", "pSO0jwQNh4mshw7770dEVhfjWhMEp1XHwcKjsnCx2DHBSZ4q6C")
		.header("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com")
		.end(function (result) {
			//console.log(result.headers)
			if (result.status === 200) {
				var substitutes = result.body["substitutes"]
				var message = result.body["message"]
				callback([substitutes,message])
			}
			else {
				throw err
			}
		})
	},

	subIngredientsByID: function(id,callback) {
		const url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/ingredients/" + encodeURI(id) + "/substitutes"
		unirest.get(url)
		.header("X-Mashape-Key", "pSO0jwQNh4mshw7770dEVhfjWhMEp1XHwcKjsnCx2DHBSZ4q6C")
		.header("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com")
		.end(function (result) {
			//console.log(result.headers)
			if (result.status === 200) {
				var substitutes = result.body["substitutes"]
				var message = result.body["message"]
				callback([substitutes,message])
			}
			else {
				throw err
			}
		})
	}
}