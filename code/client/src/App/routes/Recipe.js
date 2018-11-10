import React, { Component } from 'react'

class Recipe extends Component {
  // Initialize the state
  constructor(props) {
    super(props)
    this.state = {
      recipeName : this.props.location.state.recipe,
      recipeID : this.props.location.state.recipeID,
      recipeInfo : []
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
    .then(recipeInfo => {
      this.setState({ recipeInfo : recipeInfo })
      console.log(this.state.recipeInfo)
    })
  }

  render() {

    const id = this.state.recipeID
    const info = this.state.recipeInfo.map((recipe,index) => {
      var step = Object.values(recipe)[1].replace(/\n|\r/g, "")
      return (
        <li key={index}> {step} <br/> </li>
      )
    })

    return (
      <div className="App">
        <h1> Your Recipe </h1>
        <div>
          {this.state.recipeName}
        </div>
        <br/>
        <div>
          <h3> Recipe Info </h3>
          <p> RecipeID : {id} </p>
          <p> Steps: </p>
          <ol> {info} </ol>
        </div>
      </div>
    )
  }
}

export default Recipe