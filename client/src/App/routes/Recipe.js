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
      swapWith : "",
      imageUrl: "",
      sourceUrl: ""
    }
  }

  // Fetch on first mount
  componentDidMount() {
    this.getRecipeInfo()
  }

  // Get Ingredients and Instructions
  getRecipeInfo = () => {
    fetch('/recipe_info',{
      method : 'POST',
      body : JSON.stringify({
        'recipeID' : this.state.recipeID
      }),
      headers : {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      this.setState({
        instructions : data[0],
        ingredients : data[1],
        imageUrl : data[2],
        sourceUrl : data[3]
      })
    })
  }

  getSubIngredient = (ingredient) => {
    this.setState({
      swapWith : ingredient
    })
    fetch('/recipe_info',{
      method : 'POST',
      body : JSON.stringify({
        'ingredient' : ingredient
      }),
      headers : {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      this.setState({
        subIngredients : data[0],
        message : data[1]
      })
    })
  }

  render() {
    const swapIngredients = (subIngredient) => {
      let temp = this.state.ingredients
      console.log("BABABABA:",temp)
      console.log("LALALALA:",subIngredient)
      for (let key in temp) {
        if (temp[key]['name'] === this.state.swapWith) {
          temp[key]['name'] = subIngredient
        }
      }
      this.setState({
        ingredients : temp
      })
    }

    let displaySubstitutes
    if (this.state.subIngredients != null) {
      displaySubstitutes = this.state.subIngredients.map((subIngredient,index) => {
        return (
          <div key={index}>
            <button className="substituteButton" onClick={swapIngredients.bind(this,subIngredient)}> 
              {subIngredient}
            </button>
          </div>
        )
      })
    }

    const recipeName = this.state.recipeName

    const ingredients = this.state.ingredients.map((ingredientInfo,index) => {
      let ingredient = Object.values(ingredientInfo)[4]
      let measurement = Object.values(ingredientInfo)[8]
      let unit = Object.values(ingredientInfo)[9]
      return (
        <Popup
          key={index}
          className="ingredients"
          trigger={<button className="ingredientButton"> {measurement} {unit} of {ingredient} </button>} 
          closeOnDocumentClick
          onOpen={this.getSubIngredient.bind(this,ingredient)}
          modal={true}
          contentStyle={{border:'solid',borderRadius:'9px',borderColor:'orange'}}>
          <p className="close2"> &times; </p>
          <strong> Select Ingredient </strong>
          {displaySubstitutes}
          {this.state.message}
        </Popup>
      )
    })

    const instructions = this.state.instructions.map((instruction,index) => {
      let step = Object.values(instruction)[1].replace(/\n|\r/g, "")
      return (
        <div key={index}>
          <p> 
            <strong className="smaller-title2"> Step {index+1} </strong> 
            {step}
          </p>
        </div>
      )
    })

    return (
      <div>
        <div className="colorStrip">
          <h1 className="title"> PieceMeal </h1>
        </div>

        <a href="/"> <img className="icon" src="images/icon.png" alt="icon" href="/"/> </a>

        <h2 className="title2"> {recipeName} </h2>

        <div className="food-image">
          <a href={this.state.sourceUrl} target="_blank" rel="noopener noreferrer"> <img src={this.state.imageUrl} alt="food_image"/> </a>
        </div>
        
        <div className="ingredients">
          <h2> <strong className="smaller-title"> Ingredients </strong> </h2> 
          {ingredients}
        </div>

        <div className="box-text2">
          <div className="instructions">
            <h2> <strong className="smaller-title2"> Instructions </strong> </h2> 
            {instructions}
          </div>

          <p className="smaller-title3"> Link </p>
          <a className="link" href={this.state.sourceUrl} target="_blank" rel="noopener noreferrer"> 
            {this.state.sourceUrl}
          </a>
        </div>
      </div>
    )
  }
}

export default Recipe