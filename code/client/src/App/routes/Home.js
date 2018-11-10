import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Home extends Component {
  // Initialize the state
  constructor(props) {
    super(props)
    this.state = {
      recipes: [],
      scrapedRecipe: [],
      recipeName: "",
      url:""
    }
    this.recipeName = React.createRef()
    this.url = React.createRef()
  }

  // Fetch on first mount
  componentDidMount() {

  }

  // Get recipes
  getRecipe = (event) => {
    event.preventDefault()
    const recipeName = this.recipeName.current.value
    this.setState({ recipeName : recipeName })
    console.log("Recipe name is: ", recipeName)
    fetch('http://localhost:3001/recipe',{
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

  // Get scraped recipes
  scrapedRecipe = (event) => {
    event.preventDefault()
    const url = this.url.current.value
    this.setState({ url : url })
    fetch('/scrapedRecipe')
    .then(res => res.json())
    .then(scrapedRecipe => this.setState({ scrapedRecipe }))     
  }

  render() {
    // const recipes = this.state.recipes.map((recipe) => <Link key={recipe.toString()} to={{pathname : "/recipe", state : { recipe : recipe}}}> {recipe} <br/> </Link>)
    const scrapedRecipes = this.state.scrapedRecipe
    const recipeName = this.state.recipeName
    const url = this.state.url
    const rec = this.state.recipes.map((recipe,index) => {
      return (<Link key={index} to={{ pathname : "/recipe", state : {recipe : Object.keys(recipe)[0], recipeID : Object.values(recipe)[0]} }}> <p> {Object.keys(recipe)[0]} <br/> </p> </Link>)
    })

    if (recipeName.length)
    {
      return (
        <div className="App">
          <h1> PieceMeal </h1>
          <div>
            <form onSubmit={this.getRecipe}>
              <label>
                Enter Food Name:
                <br/>
                <input type="text" ref={this.recipeName}/>
              </label>
              <br/>
              <button className="button" type="submit"> Search </button>
            </form>
            <br/>
            <form onSubmit={this.scrapedRecipe}>
              <label>
                Enter Url:
                <br/>
                <input type="text" ref={this.url}/>
              </label>
              <br/>
              <button className="button" type="submit"> Search </button>
            </form>
          </div>
          <br/>
          <div>
            You searched for {recipeName}
          </div>
          <br/>
          <div>
            {rec}
          </div>
        </div>
      )
    }
    else
    {
      return (
        <div className="App">
          <h1> PieceMeal </h1>
          <div onSubmit={this.getRecipe}>
            <form>
              <label>
                Enter Food Name:
                <br/>
                <input type="text" ref={this.recipeName}/>
              </label>
              <br/>
              <button className="button" type="submit"> Search </button>
            </form>
            <br/>
            <form onSubmit={this.scrapedRecipe}>
              <label>
                Enter Url:
                <br/>
                <input type="text" ref={this.url}/>
              </label>
              <br/>
              <button className="button" type="submit"> Search </button>
            </form>
          </div>
        </div>
      )      
    }
  }
}
export default Home

 