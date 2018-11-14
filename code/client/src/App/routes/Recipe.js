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
      subIngredients : [],
      message : "",
      swapWith : ""
    }
  }

  // Fetch on first mount
  componentDidMount() {
    this.getRecipeInfo()
  }

  // Get Ingredients and Instructions
  getRecipeInfo = () => {
    fetch('/recipeInfo',{
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

  getSubIngredient = (ingredient) => {
    //event.preventDefault()
    //const ingredient = event.target.textContent
    this.setState({swapWith : ingredient})
    console.log("Substitute: ", ingredient)
    fetch('/recipeInfo',{
      method : 'POST',
      body : JSON.stringify({'ingredient' : ingredient}),
      headers : {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      this.setState({subIngredients : data[0]})
      this.setState({message : data[1]})
      console.log(this.state.subIngredients)
      console.log(this.state.message)
    })
  }


  swapIngredients = (subIngredient) => {
    //console.log("What I'm swapping: ", this.swapWith.current.textContent)
    //console.log("Swap the ingredient with this: ", subIngredient)
    //console.log("Current Ingredients: ", this.state.ingredients)
    var temp = this.state.ingredients
    for (let key in temp){
      //console.log(temp[key]['name'])
      if (temp[key]['name'] === this.state.swapWith){
        console.log("WHY: ",temp[key]['name'])
        temp[key]['name'] = subIngredient
        console.log(temp)
      }
    }
    this.setState({ingredients : temp})
    //console.log("Updated ingredients: " ,this.state.ingredients)
  }

  render() {

    var displaySubstitutes;
    if (this.state.subIngredients != null) {
      displaySubstitutes = this.state.subIngredients.map((subIngredient,index) => {
        return (
          <button key={index} className="button" onClick={this.swapIngredients.bind(this,subIngredient)}> 
            {subIngredient} 
          </button>
        )
      })
    }

    const recipeName = this.state.recipeName
    
    const id = this.state.recipeID

    const ingredients = this.state.ingredients.map((ingredientInfo,index) => {
      var ingredient = Object.values(ingredientInfo)[4]
      return (
        <div key={index}>
          <Popup
            trigger={
              <button className="button"> 
                {ingredient}
              </button>
            } 
            position="right center" 
            closeOnDocumentClick
            onOpen={this.getSubIngredient.bind(this,ingredient)}
            >
            <div>
              Select Ingredients
              <br/>
              {displaySubstitutes}
              <br/>
              {this.state.message}
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
        <div>
          <h2> Your Recipe </h2>
          {recipeName}
        </div>
        <br/>
        <br/>
        <div>
          <h4> Recipe Info </h4>
          <p> Recipe ID: {id} </p>
        </div>
        <div>
          <h4> Ingredients: </h4>
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