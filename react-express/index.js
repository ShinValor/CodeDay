const express = require('express')
const path = require('path')
const fs = require('fs')
const unirest = require('unirest')
const bodyParser = require('body-parser')
const cors = require('cors')
const corsOptions = {
    credentials: true,
    origin: true
}

const app = express()

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')))
app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


app.get('/recipe', (req,res) => {
	console.log("recipe GET")
	var list = ["Chicken","Rice","Egg","Bacon"]
	res.json(list)
})

app.post('/recipe', (req,res) => {
	console.log("recipe POST")
	var recipeName = req.body.recipeName
	console.log("Passed RecipeName: ", recipeName)
	var list = ["Chicken","Rice","Egg","Bacon"]
	res.json(list)
})

app.get('/webScrapedRecipe', (req,res) => {
	console.log("web GET")
	var list = ["webRecipe1", "webRecipe2", "webRecipe3"]
	res.json(list)
})

app.post('/webScrapedRecipe', (req,res) => {
	console.log("web POST")
	//var recipeName = req.body.recipeName
	//console.log("Passed RecipeName: ", recipeName)
	var list = ["webRecipe1", "webRecipe2", "webRecipe3"]
	res.json(list)
})

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
	console.log("NOTHING")
	res.send("1")
	//res.sendFile(path.join(__dirname+'/client/build/index.html'))
})

const port = process.env.PORT || 3001
app.listen(port)

console.log('App is listening on port ' + port)
