import React, { Component } from 'react'
import Popup from 'reactjs-popup'

class ScrapedRecipe extends Component {

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
    this.getScrapedRecipe()
  }

  getScrapedRecipe = () => {
    fetch('http://localhost:5000/scrapedRecipe',{
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

  render() {

    const url = this.state.recipeUrl
    const title = this.state.recipeName
    const ingredients = this.state.ingredients
    const instructions = this.state.instructions

    return (
      <div>
        <br/>
        <h2> {title} </h2>
        <br/>
      </div>
    )
  }
}

export default ScrapedRecipe