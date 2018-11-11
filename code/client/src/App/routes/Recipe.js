import React, { Component } from 'react'
import Popup from 'reactjs-popup'

class Recipe extends Component {
  // Initialize the state
  constructor(props) {
    super(props)
    this.state = {
      recipeName : this.props.location.state.recipe,
      recipeID : this.props.location.state.recipeID,
      ingredients : [],
      instructions : [],
      subIngredient : []
    }
    this.selectIngredient = React.createRef()
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
      this.setState({ instructions : data[0] })
      this.setState({ ingredients : data[1] })
      console.log(this.state.instructions)
      console.log(this.state.ingredients)
    })
  }

  getSubIngredient = (event) => {
    event.preventDefault()
    const ingredient = this.selectIngredient.current.value
    console.log("BLAH: ", this.selectIngredient.current.value)
    fetch('http://localhost:3001/recipeInfo',{
      method : 'POST',
      body : JSON.stringify({'ingredient' : ingredient}),
      headers : {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      this.setState({subIngredient : data})
      console.log(this.state.subIngredient)
    })
  }

  render() {

    const recipeName = this.state.recipeName
    const id = this.state.recipeID

    // Remember to link ingredient id so I can call substitute api
    const ingredients = this.state.ingredients.map((ingredientInfo,index) => {
      var ingredient = Object.values(ingredientInfo)[4]
      return (
        <div key={index}>
          <Popup 
            trigger={
              <form onSubmit={this.getSubIngredient}>
                <button ref={this.selectIngredient} className="button"> 
                  {ingredient}
                </button>
              </form>} 
            position="right center" 
            closeOnDocumentClick
          >
            <div>
              Select Ingredient
                <div>
                  <Popup trigger={<button className="button"> Trigger 2 </button>} position="top left" closeOnDocumentClick>
                    <span> Pop2 </span>
                  </Popup>
                </div>
            </div>
          </Popup>
        </div>
      )
    })

    const instructions = this.state.instructions.map((stepInfo,index) => {
      var step = Object.values(stepInfo)[1].replace(/\n|\r/g, "")
      return (
        <div key={index}>
          <a> <strong> Step {index+1}: </strong> <br/> {step} </a>
          <br/>
          <br/>
        </div>
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
          {ingredients}
        </div>
        <br/>
        <div>
          {instructions}
        </div>
      </div>
    )
  }
}

export default Recipe