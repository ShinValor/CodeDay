import React, { Component } from 'react'
import Popup from 'reactjs-popup'

class UrlRecipe extends Component {
  // Initialize the state
  constructor(props) {
    super(props)
    this.state = {
      recipeUrl : this.props.location.state.recipeUrl,
      recipeName: "",
      ingredients : [],
      instructions : [],
      subIngredients : [],
      message : "",
      swapWith : ""
    }
  }

  // Fetch on first mount
  componentDidMount() {
    this.getUrlRecipe()
  }

  getUrlRecipe = () => {
    fetch('http://localhost:5000/url_recipe',{
     method : 'POST',
     body : JSON.stringify({'url' : this.state.recipeUrl}),
     headers : {
      'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      this.setState({ recipeName : data[0] })
      this.setState({ instructions : data[1] })
      this.setState({ ingredients : data[2] })
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

    const title = this.state.recipeName
    const url = this.state.recipeUrl

    const swapIngredients = (subIngredient) => {
      var temp = this.state.ingredients
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
          <button key={index} className="button" onClick={swapIngredients.bind(this,subIngredient)}> 
            {subIngredient} 
          </button>
        )
      })
    }

    const ingredients = this.state.ingredients.map((ingredientInfo,index) => {
      var ingredient = Object.values(ingredientInfo)[4]
      var measurement = Object.values(ingredientInfo)[8]
      var unit = Object.values(ingredientInfo)[9]
      return (
        <div key={index}>
          <Popup
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
        <div key={index}>
          <p className="instructions"> 
            <strong> Step {index+1} </strong> 
            <br/>
            {step}
          </p>
          <br/>
        </div>
      )
    })

    return (
        <div className="App">
            <br/>
            <div>
                <h2> {title} </h2>
                <h3> {url} </h3>
            </div>
            <br/>
            <div>
                <h4> Ingredients </h4>
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

export default UrlRecipe