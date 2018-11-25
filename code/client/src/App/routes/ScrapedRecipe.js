import React, { Component } from 'react'
import Popup from 'reactjs-popup'

class ScrapedRecipe extends Component {

  // Initialize the state
  constructor(props) {
    super(props)
    this.state = {
      recipeUrl : this.props.location.state.recipeUrl,
      recipeInfo : {}
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
    .then(scrapedRecipe => {
      this.setState({ recipeInfo : scrapedRecipe })
      //console.log(this.state.recipeInfo)
    })
  }

  render() {

    const url = this.state.recipeUrl
    const title = this.state.recipeInfo['title']
    const info = this.state.recipeInfo['extendedIngredients']

    console.log("Passed Url:",url)

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