## PieceMeal

### Introduction
Anyone who cooks or bakes knows that often times it will takes a while to find a recipe which contains ingredients one currently has at home. Sometimes you also have to spend some time looking up substitutions for ingredients because you just can’t find a recipe that includes only ingredients that you have on hand. Imagine if you could just click on any item in the ingredient list and a small bubble would pop up, listing a few possible substitutions! This is the main idea behind our project. To our knowledge, nothing of the sort currently exists; we are attempting to build a solution which has not yet been created. We have two possible models for version one. The first requires the user to search for a recipe from within our web app, which would fetch a matching option from the API. Then, from within our web app the user would be able to see substitutions for the ingredients, as described above. The second model is a ‘bookmarklet’ script which injects our code into any webpage, thus enabling our feature to work with any recipe a user may choose. We also have thought of various additions that could be added to possible future versions, such as information on cooking terms (for example, if you click on ‘saute’ a bubble will pop up and explain what that means), an option for the user to add substitutions that may be missing from our database, a way for a user to sign into an account and save recipes to create a virtual cookbook, etc. 
 
### User-Types 
There is really only one user type for our project- the cook. (We would also probably maintain an Administrator to keep control of the database. Other than that there are no other user types because the user isn’t interacting with anyone else; every user of our app is in the same type of user position.) 
 
### User Stories 
As a cook I can easily find substitutes for ingredients I may not have at home. As a user I can stay within my recipe page without having to look up any substitutions. In the case of the API model, user can look up recipes based on keywords. 

### Future Development 
As a user I can learn what a cooking term means easily by clicking on it. As a user I can save all my favorite recipes to my virtual cookbook and retrieve them at any time. 

## Technologies/Tools
* [Node.js](https://nodejs.org/en/)
* [React.js](https://reactjs.org/)
* [Express.js](https://expressjs.com/)
* [React-Router](https://reacttraining.com/react-router/core/guides/philosophy)
* [Reactjs-Popup](https://react-popup.elazizi.com/)
* [Material-UI-Search-Bar](https://www.npmjs.com/package/material-ui-search-bar)
* [Spoonacular Api](https://spoonacular.com/food-api)
* [Bootstrap](https://github.com/twbs/bootstrap)

## Deployment

### Install dependencies for server
npm install

### Install dependencies for client
npm run client-install

### Run the client & server with concurrently
npm run dev

### Run the Express server only
npm run server

### Run the React client only
npm run client

### Server runs on http://localhost:5000 and client on http://localhost:3000

### Prerequisites
In order to run this project node.js and npm both need to have been installed.

## Beta Launch Using Heroku
https://piece-meals.herokuapp.com

## Contributors
* [Ho Ming Poon](https://github.com/ShinValor)
* [Sora Greenberger](https://github.com/SoraDavis)
* [Excel Espina](https://github.com/ExcelE)

## Cohort
[CUNY Tech Prep](http://cunytechprep.nyc/) is a [NYC Tech Talent Pipeline](http://www.techtalentpipeline.nyc/)
