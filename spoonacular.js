const unirest = require('unirest')

module.exports = {

	getRecipeByName : function(food, callback) {
		unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?query=" + encodeURI(food))
		.header("X-Mashape-Key", "3V8xGMSKtimsh6HIewO0R8I8syHRp1VnvDbjsn1tqsqiBRQpQF")
		.header("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com")
		.end(function (result) {
			if (result.status === 200) {
				var recipes = []
				for (index in result.body['results']) {
                    try {
                        recipes.push({[result.body['results'][index]['title']] : result.body['results'][index]['id']})
                    }
                    catch(error) {
                        console.log("Can not find that recipe")
                    }
				}
				callback(recipes)
			}
			else {
				throw err
			}
		})
	},

	getRecipeInfoByID : function(id, callback) {
		unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + encodeURI(id) + "/information")
		.header("X-Mashape-Key", "3V8xGMSKtimsh6HIewO0R8I8syHRp1VnvDbjsn1tqsqiBRQpQF")
		.header("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com")
		.end(function (result) {
			if (result.status === 200) {
                try {
                    callback([result.body['analyzedInstructions'][0]['steps'],result.body['extendedIngredients'],result.body['image'],result.body['sourceUrl']])
                }
                catch(error) {
                    console.log("Can not find that recipe")
                }
			}
			else {
				throw err
			}
		})
	},

	scrapeRecipeByUrl : function(url,callback) {
		unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/extract?url=" + encodeURI(url))
		.header("X-Mashape-Key", "3V8xGMSKtimsh6HIewO0R8I8syHRp1VnvDbjsn1tqsqiBRQpQF")
		.header("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com")
		.end(function (result) {
			if (result.status === 200) {
                try {
                    callback([result.body['title'],result.body['analyzedInstructions'][0]['steps'],result.body['extendedIngredients'],result.body['image'],result.body['sourceUrl']])
                }
                catch(error) {
                    console.log("Can not find that recipe")
                }
			}
			else {
				throw err
			}
		})
	},

	subIngredientsByName: function(ingredient,callback) {
		unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/ingredients/substitutes?ingredientName=" + encodeURI(ingredient))
		.header("X-Mashape-Key", "3V8xGMSKtimsh6HIewO0R8I8syHRp1VnvDbjsn1tqsqiBRQpQF")
		.header("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com")
		.end(function (result) {
			if (result.status === 200) {
                try {
                    callback([result.body["substitutes"],result.body["message"]])
                }
                catch(error) {
                    console.log("Can not be substituted")
                }
			}
			else {
				throw err
			}
		})
	},

	subIngredientsByID: function(id,callback) {
		unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/ingredients/" + encodeURI(id) + "/substitutes")
		.header("X-Mashape-Key", "3V8xGMSKtimsh6HIewO0R8I8syHRp1VnvDbjsn1tqsqiBRQpQF")
		.header("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com")
		.end(function (result) {
			if (result.status === 200) {
                try {
                    callback([result.body["substitutes"],result.body["message"]])
                }
                catch(error) {
                    console.log("Can not be substituted")
                }
			}
			else {
				throw err
			}
		})
	},

    chatBot: function(message,callback) {
        unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/converse?contextId=342938&text=donut+recipes")
        .header("X-RapidAPI-Key", "pSO0jwQNh4mshw7770dEVhfjWhMEp1XHwcKjsnCx2DHBSZ4q6C")
        .end(function (result) {
            if (result.status === 200) {
                try {
                    callback([result.body["answerText"],result.body["media"]])
                }
                catch(error) {

                }
            }
            else {
                throw err
            }
        })
    }
}