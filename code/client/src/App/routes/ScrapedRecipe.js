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
		console.log("lala: " ,this.state.recipeUrl)
		//this.getScrapedRecipe()
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

		//const title = this.state.scrapedRecipe['title']

		return (

			<h1> Hello </h1>
		)
	}
}

export default ScrapedRecipe