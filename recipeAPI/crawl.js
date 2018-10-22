const fs = require('fs');
const unirest = require('unirest');


/*
// Extract Vegetarian Dessert
unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random?number=1&tags=vegetarian%2Cdessert")
.header("X-Mashape-Key", "pSO0jwQNh4mshw7770dEVhfjWhMEp1XHwcKjsnCx2DHBSZ4q6C")
.header("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com")
.end(function (result) {
	console.log(result.status, result.headers, result.body);
});
*/


// Extract recipe from website
//unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/extract?url=http%3A%2F%2Fwww.melskitchencafe.com%2Fthe-best-fudgy-brownies%2F")
unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/extract?url=http%3A%2F%2Fchefsavvy.com%2Fthe-best-fried-rice%2F")
.header("X-Mashape-Key", "pSO0jwQNh4mshw7770dEVhfjWhMEp1XHwcKjsnCx2DHBSZ4q6C")
.header("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com")
.end(function (result) {
  	console.log(result.headers);
  	if (result.status === 200) {
  		var content = JSON.stringify(result.body,null,2);
  		fs.writeFile("./recipeAPI/recipe.json", content);
  	}
  	else {
  		throw err;
  	}
});