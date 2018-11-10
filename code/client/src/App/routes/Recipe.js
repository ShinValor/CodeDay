import React, { Component } from 'react'

class Recipe extends Component {
  // Initialize the state
  constructor(props) {
    super(props)
    this.state = {
      recipeName : this.props.location.state.recipe,
      recipeID : this.props.location.state.recipeID,
      instructions : [],
      ingredients : []
    }
  }

  // Fetch the list on first mount
  componentDidMount() {
    this.getRecipeInfo()
  }

  getRecipeInfo = () => {
    fetch('http://localhost:3001/recipeInfo',{
      method : 'POST',
      body : JSON.stringify({'recipeID' : this.state.recipeID}),
      headers : {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      this.setState({ instructions: data[0] })
      this.setState({ ingredients : data[1] })
      console.log(this.state.instructions)
      console.log(this.state.ingredients)
    })
  }

  subIngredient = (onClick,ingredient) => {
    onClick.preventDefault()
  }

  render() {

    const recipeName = this.state.recipeName
    const id = this.state.recipeID

    // Remember to link ingredient id so I can call substitute api
    const ingredients = this.state.ingredients.map((ingredientInfo,index) => {
      var ingredient = Object.values(ingredientInfo)[4]
      return (
        <li key={index}> {ingredient} <br/> </li>
      )
    })

    const instructions = this.state.instructions.map((stepInfo,index) => {
      var step = Object.values(stepInfo)[1].replace(/\n|\r/g, "")
      return (
        <li key={index}> {step} <br/> </li>
      )
    })

    return (
      <div className="App">
        <h1> Your Recipe </h1>
        <div>
          {recipeName}
        </div>
        <br/>
        <h3> Recipe Info </h3>
        <div>
          <p> RecipeID: {id} </p>
        </div>
        <h3> Ingredients: </h3>
        <div>
          <ol> {ingredients} </ol>
        </div>
        <h3> Steps: </h3>
        <div>
          <ol> {instructions} </ol>
        </div>
      </div>
    )
  }
}

export default Recipe