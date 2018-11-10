import React, { Component } from 'react'
import Popup from 'reactjs-popup'

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

  // Fetch on first mount
  componentDidMount() {
    this.getRecipeInfo()
  }

  // Get Ingredients and Instructions
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

  NestedToolTip = () => (
    <Popup
      trigger={<button className="button"> Trigger 1 </button>}
      position="top center"
      closeOnDocumentClick
    >
      <div>
        Pop1
          <div>
            <Popup
              trigger={<button className="button"> Trigger 2 </button>}
              position="top left"
              closeOnDocumentClick
            >
              <span> Pop2 </span>
            </Popup>
          </div>
      </div>
    </Popup>
  )

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
        <h3> Recipe Info </h3>
        <div>
          <p> Recipe ID: {id} </p>
        </div>
        <h3> Ingredients: </h3>
        <div>
          <ol> {ingredients} </ol>
        </div>
        <h3> Steps: </h3>
        <div>
          <ol> {instructions} </ol>
        </div>
        <div>
          {this.NestedToolTip()}
        </div>
      </div>
    )
  }
}

export default Recipe