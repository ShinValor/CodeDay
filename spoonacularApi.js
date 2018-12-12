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
                    try {
                        var recipeName = result.body['results'][index]['title']
                        var recipeID = result.body['results'][index]['id']
                    }
                    catch{
                        var recipeName = ""
                        var recipeID = ""
                    }
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
                try {
    				var ingredients = result.body['extendedIngredients']
                    var instructions = result.body['analyzedInstructions'][0]['steps']
                }
                catch{
                    var ingredients = []
                    var instructions = []
                }
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
                try {
    				var title = result.body['title']
    				var ingredients = result.body['extendedIngredients']
    				var instructions = result.body['analyzedInstructions'][0]['steps']
                }
                catch{
                    var title = ""
                    var ingredients = []
                    var instructions = []
                }
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
                try {
    				var substitutes = result.body["substitutes"]
    				var message = result.body["message"]
                }
                catch{
                    var substitutes = []
                    var message = ""              
                }
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
                try {
                    var substitutes = result.body["substitutes"]
                    var message = result.body["message"]
                }
                catch{
                    var substitutes = []
                    var message = ""
                }
				callback([substitutes,message])
			}
			else {
				throw err
			}
		})
	}
}

/*
const fetch = require('node-fetch')

module.exports = {
    getRecipeByName:  async (query) => {
        const url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?query=" + encodeURIComponent(query)
        let resp = await fetch(url, {
            method: "GET",
            headers: {
                "X-Mashape-Key": "3V8xGMSKtimsh6HIewO0R8I8syHRp1VnvDbjsn1tqsqiBRQpQF",
                "X-Mashape-Host": "spoonacular-recipe-food-nutrition-v1.p.mashape.com",
                "Accept": "application/json",
            },
        })
        let data = await resp.json()
        if (data === undefined){
            //return ""
            console.log("Nothing")
        }
        let results = data.results
        let recipes = []
        for (index in results) {
            let recipeName = results[index].title
            let recipeID = results[index].id
            recipes.push({[recipeName]:recipeID})
        }
        return recipes   
        //console.log(recipes)
    },

    getRecipeInfoByID: async (query) => {
        const url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + query + "/information"
        let resp = await fetch(url, {
            method: "GET",
            headers: {
                "X-Mashape-Key": "3V8xGMSKtimsh6HIewO0R8I8syHRp1VnvDbjsn1tqsqiBRQpQF",
                "X-Mashape-Host": "spoonacular-recipe-food-nutrition-v1.p.mashape.com",
                "Accept": "application/json",
            },
        })
        let data = await resp.json()
        if (data === undefined){
            // return "";
            console.log("Nothing")
        }
        console.log(data)
        let ingredients = data.extendedIngredients
        let instructions = data.analyzedInstructions[0].steps
        return [ingredients,instructions]
        //console.log([ingredients,instructions])
    },

    scrapeRecipeByUrl: async (query) => {
        //unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/extract?url=http%3A%2F%2Fwww.melskitchencafe.com%2Fthe-best-fudgy-brownies%2F")
        const url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/extract?url=http%3A%2F%2F" + encodeURIComponent(query)
        let resp = await fetch(url, {
            method: "GET",
            headers: {
                "X-Mashape-Key": "3V8xGMSKtimsh6HIewO0R8I8syHRp1VnvDbjsn1tqsqiBRQpQF",
                "X-Mashape-Host": "spoonacular-recipe-food-nutrition-v1.p.mashape.com",
                "Accept": "application/json",
            },
        })
        let data = await resp.json()
        if (data === undefined){
            // return ""
            console.log("Nothing")
        }
        console.log(data)
        let title = data.title
        let ingredients = data.extendedIngredients
        let instructions = data.analyzedInstructions[0].steps
        return [title,instructions,ingredients]
        //console.log([title,instructions,ingredients])
    },

    subIngredientsByName: async (query) => {
        const url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/ingredients/substitutes?ingredientName=" + encodeURIComponent(query)
        let resp = await fetch(url, {
            method: "GET",
            headers: {
                "X-Mashape-Key": "3V8xGMSKtimsh6HIewO0R8I8syHRp1VnvDbjsn1tqsqiBRQpQF",
                "X-Mashape-Host": "spoonacular-recipe-food-nutrition-v1.p.mashape.com",
                "Accept": "application/json",
            },
        })
        let data = await resp.json()
        if (data === undefined){
            // return ""
            console.log("Nothing")
        }
        let substitutes = data.substitutes
        let message = data.message
        return [substitutes,message]
        //console.log([substitutes,message])
    },


    subIngredientsByID: async (query) => {
        const url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/ingredients/" + id + "/substitutes"
        let resp = await fetch(url, {
            method: "GET",
            headers: {
                "X-Mashape-Key": "3V8xGMSKtimsh6HIewO0R8I8syHRp1VnvDbjsn1tqsqiBRQpQF",
                "X-Mashape-Host": "spoonacular-recipe-food-nutrition-v1.p.mashape.com",
                "Accept": "application/json",
            },
        })
        let data = await resp.json()
        if (data === undefined){
            // return ""
            console.log("Nothing")
        }
        let substitutes = data.substitutes
        let message = data.message
        return [substitutes,message]
        //console.log([substitutes,message])
    }
}
*/