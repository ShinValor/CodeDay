const express = require('express')
const path = require('path')
const unirest = require('unirest')
const bodyParser = require('body-parser')
const cors = require('cors')
const myApi = require('./spoonacular')

const corsOptions = {
  credentials: true,
  origin: true
}

const app = express()

const port = process.env.PORT || 5000

app.listen(port)

app.use(express.static(path.join(__dirname, '/public')))

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) 


const getRecipeByName = myApi.getRecipeByName
const scrapeRecipeByUrl = myApi.scrapeRecipeByUrl
const getRecipeInfoByID = myApi.getRecipeInfoByID
const subIngredientsByName = myApi.subIngredientsByName
const chatBot = myApi.chatBot

app.get('/recipe',(req,res) => {
  console.log("Recipe GET")
})

app.post('/recipe',(req,res) => {
  console.log("Recipe POST")
  let recipeName = req.body["recipeName"]
  console.log("Passed RecipeName:", recipeName)
  getRecipeByName(recipeName,(data) => {
    res.json(data)
  })
})

app.get('/url_Recipe',(req,res) => {
  console.log("Url GET")
})

app.post('/url_Recipe',(req,res) => {
  console.log("Url POST")
  let url = req.body.url
  console.log("Passed Url:", url)
  scrapeRecipeByUrl(url,(data) => {
    res.json(data)
  })
})

app.get('/recipe_info',(req,res) => {
  console.log("Recipe Info GET")
})

app.post('/recipe_info',(req,res) => {
  console.log("Recipe Info POST")
  if (req.body.recipeID) {
    let recipeID = req.body.recipeID
    console.log("Recipe ID:", recipeID)
    getRecipeInfoByID(recipeID,(data) => {
      res.json(data)
    })
  }
  else if (req.body.ingredient) {
    let ingredient = req.body.ingredient
    console.log("Ingredient:", ingredient)
    subIngredientsByName(ingredient,(data) => {
      res.json(data)
    })
  }
})

app.post('/message',(req,res) => {
  console.log("Message POST")
  let message = req.body.message
  console.log("Passed message:", message)
  chatBot(message,(data) => {
      res.json(data)
  })
})

// Handles any requests that don't match the ones above
app.get('/*',(req,res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'))
})

console.log('App is listening on port ' + port)