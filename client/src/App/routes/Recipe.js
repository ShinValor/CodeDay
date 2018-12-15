
import React, { Component } from 'react'
import Popup from 'reactjs-popup'
//import Music from './components/Music'

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
            this.setState({imageUrl : data[2]})
            this.setState({sourceUrl : data[3]})
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
            <Popup
            key={index}
            className="ingredients"
            trigger={<button className="ingredientButton"> {measurement} {unit} of {ingredient} </button>} 
            closeOnDocumentClick
            onOpen={this.getSubIngredient.bind(this,ingredient)}
            modal={true}
            contentStyle={{border:'solid',borderRadius:'9px',borderColor:'orange'}}>
                <div>
                    <a className="close2"> &times; </a>
                    Select Ingredients
                    <br/>
                    {displaySubstitutes}
                    <br/>
                    {this.state.message})
                </div>
            </Popup>
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
            <div className="colorStrip"> </div>
            <a href="/"> <img className="icon" src="icon.png" alt="icon" href="/"/> </a>
            <div>
                <br/>
                <h2 className="title"> {recipeName} </h2>
                <br/>
            </div>

            <div className="food-image">
                <a href={this.state.sourceUrl} target="_blank" rel="noopener noreferrer"> <img src={this.state.imageUrl} alt="food_image"/> </a>
            </div>
            
            <div className="ingredients">
                <h2 className="smaller-title"> <strong> Ingredients </strong> </h2> 
                {ingredients}
            </div>

            <div className="box-text2">
                <h2 className="smaller-title2"> <strong> Instructions </strong> </h2> 
                {instructions}
                <br/>
                <br/>
                <a className="smaller-title3"> Link </a>
                <br/>
                <a className="link" href={this.state.sourceUrl} target="_blank" rel="noopener noreferrer"> 
                    {this.state.sourceUrl}
                </a> 
            </div>
            <br/>
            <br/>
        </div>
    )
  }
}

export default Recipe