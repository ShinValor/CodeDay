const unirest = require('unirest')

module.exports = {

  getRecipeByName : (food,fn) => {
    unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?query=" + encodeURI(food))
    .header("X-Mashape-Key", "3V8xGMSKtimsh6HIewO0R8I8syHRp1VnvDbjsn1tqsqiBRQpQF")
    .header("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com")
    .end((result) => {
      if (result.status === 200) {
        let recipes = []
        result.body['results'].forEach((index) => {
          try {
            recipes.push({[index['title']] : index['id']})
          }
          catch(error) {
            console.log("Can not find that recipe")
          }
        })
        fn(recipes)
      }
      else {
        throw err
      }
    })
  },

  getRecipeInfoByID : (id,fn) => {
    unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + encodeURI(id) + "/information")
    .header("X-Mashape-Key", "3V8xGMSKtimsh6HIewO0R8I8syHRp1VnvDbjsn1tqsqiBRQpQF")
    .header("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com")
    .end((result) => {
      if (result.status === 200) {
        try {
          fn([result.body['analyzedInstructions'][0]['steps'],result.body['extendedIngredients'],result.body['image'],result.body['sourceUrl']])
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

  scrapeRecipeByUrl : (url,fn) => {
    unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/extract?url=" + encodeURI(url))
    .header("X-Mashape-Key", "3V8xGMSKtimsh6HIewO0R8I8syHRp1VnvDbjsn1tqsqiBRQpQF")
    .header("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com")
    .end((result) => {
      if (result.status === 200) {
        try {
          fn([result.body['title'],result.body['analyzedInstructions'][0]['steps'],result.body['extendedIngredients'],result.body['image'],result.body['sourceUrl']])
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

  subIngredientsByName: (ingredient,fn) => {
    unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/ingredients/substitutes?ingredientName=" + encodeURI(ingredient))
    .header("X-Mashape-Key", "3V8xGMSKtimsh6HIewO0R8I8syHRp1VnvDbjsn1tqsqiBRQpQF")
    .header("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com")
    .end((result) => {
      if (result.status === 200) {
        try {
          fn([result.body["substitutes"],result.body["message"]])
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

  subIngredientsByID: (id,fn) => {
    unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/ingredients/" + encodeURI(id) + "/substitutes")
    .header("X-Mashape-Key", "3V8xGMSKtimsh6HIewO0R8I8syHRp1VnvDbjsn1tqsqiBRQpQF")
    .header("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com")
    .end((result) => {
      if (result.status === 200) {
        try {
          fn([result.body["substitutes"],result.body["message"]])
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
    unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/converse?contextId=342938&text=" + encodeURI(message))
    .header("X-Mashape-Key", "3V8xGMSKtimsh6HIewO0R8I8syHRp1VnvDbjsn1tqsqiBRQpQF")
    .header("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com")
    .end(function (result) {
      if (result.status === 200) {
        try {
            callback([result.body["answerText"],result.body["media"]])
        }
        catch(error) {
            console.log("We no found")
        }
      }
      else {
        throw err
      }
    })
  }
}