import React, { Component } from 'react'
import Popup from 'reactjs-popup'
//import { Parallax, Background } from 'react-parallax'

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
    fetch('http://localhost:5000/recipe_info',{
      method : 'POST',
      body : JSON.stringify({'recipeID' : this.state.recipeID}),
      headers : {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      this.setState({instructions : data[0]})
      this.setState({ingredients : data[1]})
    })
  }

  getSubIngredient = (ingredient) => {
    this.setState({swapWith : ingredient})
    fetch('http://localhost:5000/recipe_info',{
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
    })
  }


  render() {

    const swapIngredients = (subIngredient) => {
      var temp = this.state.ingredients
      console.log("BABABABA:",temp)
      console.log("LALALALA:",subIngredient)
      for (let key in temp) {
        if (temp[key]['name'] === this.state.swapWith) {
          temp[key]['name'] = subIngredient
        }
      }
      this.setState({ingredients : temp})
    }

    var displaySubstitutes
    if (this.state.subIngredients != null) {
      displaySubstitutes = this.state.subIngredients.map((subIngredient,index) => {
        return (
          <button key={index} className="substituteButton" onClick={swapIngredients.bind(this,subIngredient)}> 
            {subIngredient} 
          </button>
        )
      })
    }

    const recipeName = this.state.recipeName

    const ingredients = this.state.ingredients.map((ingredientInfo,index) => {
        var ingredient = Object.values(ingredientInfo)[4]
        var measurement = Object.values(ingredientInfo)[8]
        var unit = Object.values(ingredientInfo)[9]
        return (
            <div key={index}>
                <Popup
                className="ingredientButton-wrapper"
                trigger={ <button className="ingredientButton"> {measurement} {unit} of {ingredient} </button> } 
                position="right center" 
                closeOnDocumentClick
                onOpen={this.getSubIngredient.bind(this,ingredient)}
                on="hover">
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

    const instructions = this.state.instructions.map((instruction,index) => {
      var step = Object.values(instruction)[1].replace(/\n|\r/g, "")
      return (
        <div key={index} className="instructions">
            <p> 
                <strong className="smaller-title2"> Step {index+1} </strong> 
                <br/>
                {step}
            </p>
        </div>
      )
    })

    return (
        <div>
            <div>
                <br/>
                <h2 className="title"> {recipeName} </h2>
                <br/>
            </div>
            <div>
                <h4 className="smaller-title"> <strong> Ingredients </strong> </h4> 
                {ingredients}
            </div>
            <br/>
            <div className="box-text2">
                {instructions}
            </div>
        </div>
    )
  }
}

export default Recipe

/*
            <Parallax
                bgImage={require('./icon.png')}
                bgImageAlt="icon"
                bgWidth="200px"
                bgHeight="200px"
                strength={200}
            >

*/