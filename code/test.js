const myApi = require('./spoonacularApi')

var recipeName = "Steak"
var recipeID = 475182
let getRecipeByName = myApi.getRecipeByName
let getRecipeInfoByID = myApi.getRecipeInfoByID
let scrapeRecipeByUrl = myApi.scrapeRecipeByUrl
let subIngredientsByName = myApi.subIngredientsByName

getRecipeByName(recipeName,function(listOfRecipes) {
	console.log(listOfRecipes)
})

getRecipeInfoByID(recipeID,function(data){
	console.log(data)
})

scrapeRecipeByUrl("chefsavvy.com/the-best-fried-rice",function(data){
	console.log(data)
})

subIngredientsByName("butter",function(data){
	console.log(data)
})

console.log("lala")