const fs = require('fs');
const unirest = require('unirest');


 // Extract Vegetarian Dessert
unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random?number=1&tags=vegetarian%2Cdessert")
.header("X-Mashape-Key", "pSO0jwQNh4mshw7770dEVhfjWhMEp1XHwcKjsnCx2DHBSZ4q6C")
.header("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com")
.end(function (result) {
	console.log(result.headers)
	if (result.status === 200){
		var data = result.body;
		function parse(data){
			// Parse
			//var temp = {};
			//temp["gluten"] = data["glutenFree"];
			//temp["dairy"] =  data["dairyFree"];
			//temp["vegetarian"] = data["vegetarian"];
 			//data = temp;
			data = JSON.stringify(data,null,2);
			return data;
		}
		data = parse(data);
		fs.writeFileSync("./recipe.json", data);
	}
	else{
		throw err;
	}
});


/*
// Extract recipe from website
//unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/extract?url=http%3A%2F%2Fwww.melskitchencafe.com%2Fthe-best-fudgy-brownies%2F")
unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/extract?url=http%3A%2F%2Fchefsavvy.com%2Fthe-best-fried-rice%2F")
.header("X-Mashape-Key", "pSO0jwQNh4mshw7770dEVhfjWhMEp1XHwcKjsnCx2DHBSZ4q6C")
.header("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com")
.end(function (result) {
	console.log(result.headers);
	if (result.status === 200){
		var data = result.body;
		function parse(data){
			// Parse
			var temp = {};
			temp["gluten"] = data["glutenFree"];
			temp["dairy"] =  data["dairyFree"];
			temp["vegetarian"] = data["vegetarian"];
 			data = temp;
			data = JSON.stringify(data,null,2);
			return data;
		}
		data = parse(data);
		fs.writeFileSync("./recipe.json", data);
	}
	else{
		throw err;
	}
});
*/