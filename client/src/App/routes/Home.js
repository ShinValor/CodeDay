import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

class Home extends Component {
  // Initialize the state
  constructor(props) {
    super(props)
    this.state = {
      recipes : [],
      url : ""
    }
    this.searchRecipe = React.createRef()
    this.recipeUrl = React.createRef()
  }

  getRecipes = () => {
    fetch('http://localhost:5000/recipe',{
      method : 'POST',
      body : JSON.stringify({'recipeName' : this.searchRecipe.current.value}),
      headers : {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(recipe => {
      this.setState({ recipes: recipe })
    })
  }

  render() {

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

    const setUrl = () => {
      this.setState({url : this.recipeUrl.current.value})
    }

    if (this.state.url) {
      return (
        <Redirect to={{ pathname : '/scrapedRecipe', state : {recipeUrl : this.state.url} }}/>
      )
    }
    return (
      <div className="App">
        <h2> PieceMeal </h2>
        <div>
          Search Recipe
          <br/>
          <input type="text" ref={this.searchRecipe}/>
          <br/>
          <button onClick={this.getRecipes} className="button" type="submit"> Search </button>
        </div>
        <br/>
        <div>
          Enter Url
          <br/>
          <input type="text" ref={this.recipeUrl}/>
          <br/>
          <button onClick={setUrl} className="button" type="submit"> Search </button>
        </div>
        <br/>
        <div>
          {recipes}
        </div>
      </div>
    )
  }
}

export default Home
