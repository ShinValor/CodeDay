import React, { Component } from 'react'
import Popup from 'reactjs-popup'
//import Music from './components/Music'

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
            swapWith : "",
            imageUrl: "",
            sourceUrl: ""
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
            this.setState({ imageUrl : data[3]})
            this.setState({ sourceUrl : data[4] })
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
            <button key={index} className="substituteButton" onClick={swapIngredients.bind(this,subIngredient)}> 
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
            <div className="colorStrip"></div>
            <div>
                <h2 className="title"> {title} </h2>
            </div>

            <div className="food-image">
                <a href={this.state.sourceUrl} target="_blank" rel="noopener noreferrer"> <img src={this.state.imageUrl} alt="food_image"/> </a>
            </div>
            
            <div className="ingredientDiv">
                <h4 className="smaller-title"> <strong> Ingredients </strong> </h4> 
                {ingredients}
            </div>
            
            <div className="box-text2 instructionDiv">
                <a className="smaller-title3"> Link </a>
                <br/>
                <a className="link" href={this.state.sourceUrl} target="_blank" rel="noopener noreferrer"> 
                    {url}
                </a> 
                <br/>
                <br/>
                {instructions}
            </div>
            <br/>
            <br/>
        </div>
    )
  }
}

export default UrlRecipe