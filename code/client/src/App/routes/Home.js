import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Home extends Component {
  // Initialize the state
  constructor(props) {
    super(props)
    this.state = {
      recipeName: "",
      url:"",
      recipes: [],
      scrapedRecipes: []
    }
    this.recipeName = React.createRef()
    this.url = React.createRef()
  }

  // Fetch on first mount
  componentDidMount() {

  }

  getRecipes = (event) => {
    event.preventDefault()
    const recipeName = this.recipeName.current.value
    this.setState({ recipeName : recipeName })
    console.log("Recipe name is: ", recipeName)
    fetch('/recipe',{
      method : 'POST',
      body : JSON.stringify({'recipeName' : recipeName}),
      headers : {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(recipe => {
      this.setState({ recipes: recipe })
      //console.log(this.state.recipes)
    })
  }

  getScrapedRecipes = (event) => {
    event.preventDefault()
    const url = this.url.current.value
    console.log("Url: ", url)
    this.setState({ url : url })
    fetch('/scrapedRecipe',{
     method : 'POST',
      body : JSON.stringify({'url' : url}),
      headers : {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(scrapedRecipes => {
      this.setState({ scrapedRecipes })
    })
  }

  render() {
    const recipeName = this.state.recipeName

    const url = this.state.url

    const recipes = this.state.recipes.map((recipe,index) => {
      return (
        <Link key={index} to={{ pathname : "/recipe", state : {recipe : Object.keys(recipe)[0], recipeID : Object.values(recipe)[0]} }}> 
          <p>
            {Object.keys(recipe)[0]} 
            <br/> 
          </p> 
        </Link>
      )
    })

    const scrapedRecipes = this.state.scrapedRecipes.map((recipe,index) => {
      return (
        <Link key={index} to={{ pathname : "/recipe", state : {recipe : Object.keys(recipe)[0], recipeID : Object.values(recipe)[0]} }}> 
          <p>
            {Object.keys(recipe)[0]} 
            <br/> 
          </p> 
        </Link>        
      )
    })

    const displayRecipeName = () => {
      if (recipeName.length) {
        return (
          <a> You searched for {this.state.recipeName} </a>
        )
      }
    }

    return (
      <div className="App">
        <h2> PieceMeal </h2>
        <div>
          Search Recipe
          <br/>
          <input type="text" ref={this.recipeName}/>
          <br/>
          <button onClick={this.getRecipes} className="button" type="submit"> Search </button>
        </div>
        <br/>
        <div>
          Enter Url
          <br/>
          <input type="text" ref={this.url}/>
          <br/>
          <button onClick={this.getScrapedRecipes} className="button" type="submit"> Search </button>
        </div>
        <br/>
        <div>
          {displayRecipeName()}
        </div>
        <br/>
        <div>
          {recipes}
          {scrapedRecipes}
        </div>
      </div>
    )
  }
}
export default Home

 