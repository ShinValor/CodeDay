import React, { Component } from 'react'

class Recipe extends Component {
  // Initialize the state
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  // Fetch the list on first mount
  componentDidMount() {

  }

  render() {
    const foo = this.props.location.state.recipe
    const bar = this.props.location.state.recipeID

    return (
      <div className="App">
        <h1> Your Recipe </h1>
        <div>
          {foo}
          <br/>
          RecipeID : {bar}
        </div>
      </div>
    )
  }
}

export default Recipe