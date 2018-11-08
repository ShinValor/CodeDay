import React, { Component } from 'react';
//import { Link } from 'react-router-dom';

class Home extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      list: [],
      recipe: [],
      webScrapedRecipe: []
    }
    this.recipeName = React.createRef()
  }

  // Fetch the list on first mount
  componentDidMount() {
    //this.getList()
    //this.getRecipe()
    //this.getWebScrapedRecipe()
  }

  // Retrieves the list of items from the Express app
  getList = () => {
    fetch('/home')
    .then(res => res.json())
    .then(list => this.setState({ list }))
  }

  getRecipe = (event) => {
    event.preventDefault()
    console.log("Recipe Name: ", this.recipeName.current.value)
    fetch('/recipe')
    .then(res => res.json())
    .then(recipe => this.setState({ recipe }))    
  }

  getWebScrapedRecipe = (event) => {
    event.preventDefault()
    console.log("Recipe Name: ", this.recipeName.current.value)
    fetch('/webScrapedRecipe')
    .then(res => res.json())
    .then(webScrapedRecipe => this.setState({ webScrapedRecipe }))     
  }

  render() {
    const list = this.state.list
    const recipes = this.state.recipe
    const webScrapedRecipes = this.state.webScrapedRecipe
    //console.log("HELLO ",list)
    //console.log("Unicorn ",recipes)
    //console.log("Baby ",webScrapedRecipes)
    var name = this.recipeName.current

    return (
      <div className="App">
        <h1> PieceMeal </h1>
        <div>
          <form onSubmit={this.getRecipe}>
            <label>
              <input type="text" ref={this.recipeName}/>
            </label>
            <br/>
            <button className="button" type="submit"> Search </button>
          </form>
        </div>
        <br/>
        <div>
          {/*name*/}
        </div>
      </div>
    );
  }
}
export default Home;

/*
// Link to List.js
class Home extends Component {
  render() {
    return (
      <div className="App">
        <h1> PieceMeal </h1>
        <Link to={'./list'}>
          <button variant="raised">
              My List
          </button>
        </Link>
      </div>
    );
  }
}
export default Home;


//Check to see if any items are found
        {recipes.length ? (
          <div>
            {recipes.map((recipe,i) => {
              return(
                <div key={i.toString()}>
                  {recipe}
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            <h2>No Recipe Found</h2>
          </div>
        )
      }
*/