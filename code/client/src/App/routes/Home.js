import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Home extends Component {
  // Initialize the state
  constructor(props) {
    super(props)
    this.state = {
      recipe: [],
      webScrapedRecipe: [],
      recipeName: "",
      url:""
    }
    this.recipeName = React.createRef()
    this.url = React.createRef()
  }

  // Fetch on first mount
  componentDidMount() {

  }

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
    .then(recipe => this.setState({ recipe }))
  }

  getWebScrapedRecipe = (event) => {
    event.preventDefault()
    const url = this.url.current.value
    this.setState({ url : url })
    fetch('/webScrapedRecipe')
    .then(res => res.json())
    .then(webScrapedRecipe => this.setState({ webScrapedRecipe }))     
  }

  render() {
    const recipes = this.state.recipe.map((food) => <Link key={food.toString()} to={{pathname : "/recipe", state : { recipe : food}}}> {food} <br/> </Link>)
    const webScrapedRecipes = this.state.webScrapedRecipe
    const input = this.state.recipeName
    const input2 = this.state.url

    if (input.length)
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
            <form onSubmit={this.getWebScrapedRecipe}>
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
            You searched for {input}
          </div>
          <br/>
          <div>
            {recipes}
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
            <form onSubmit={this.getWebScrapedRecipe}>
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

 