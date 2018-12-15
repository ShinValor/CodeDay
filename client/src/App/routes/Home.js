import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import SearchBar from 'material-ui-search-bar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
//import Music from './components/Music'

class Home extends Component {
    // Initialize the state
    constructor(props) {
        super(props)
        this.state = {
            recipes : [],
            url : "",
        }
    }

    getRecipes = (recipeName) => {
        fetch('http://localhost:5000/recipe',{
            method : 'POST',
            body : JSON.stringify({'recipeName' : recipeName}),
            headers : {
            'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(recipe => {
            this.setState({ recipes: recipe })
        })
    }

    sendMessage = () => {
        console.log("DID IT SEND MESSAGE")
    }    

    openChatBox = () => {
        document.getElementById("myForm").style.display = "block";
    }

    closeChatBox = () =>{
        document.getElementById("myForm").style.display = "none";
    } 


  render() {

    const recipes = this.state.recipes.map((recipe,index) => {
        return (
            <Link className="link-btn" key={index} to={{ pathname : "/recipe", state : {recipe : Object.keys(recipe)[0], recipeID : Object.values(recipe)[0]} }}> 
                <p>
                    {Object.keys(recipe)[0]} 
                    <br/> 
                </p> 
            </Link>
        )
    })

    if (this.state.url) {
        return (
            <Redirect to={{ pathname : '/url_recipe', state : {recipeUrl : this.state.url} }}/>
        )
    }

    return (
        <div>
            <h1 className="title"> PieceMeal </h1>

            <MuiThemeProvider>
                <SearchBar
                    placeholder="Search Recipe"
                    value={this.state.recipeName}
                    onChange={(newValue) => this.setState({recipeName : newValue})}
                    onRequestSearch={this.getRecipes.bind(this,this.state.recipeName)}
                    style={{
                        margin: '0 auto',
                        maxWidth: 600,
                    }}
                />
            </MuiThemeProvider>

            <br/> <br/> <br/>

            <MuiThemeProvider>
                <SearchBar
                    placeholder="Search Recipe Url"
                    value={this.state.value}
                    onChange={(newValue) => this.setState({value : newValue})}
                    onRequestSearch={() => this.setState({url : this.state.value})}
                    style={{
                        margin: '0 auto',
                        maxWidth: 600
                    }}
                />
            </MuiThemeProvider>

            <div className="box-text">
                {recipes}
            </div>

            <button className="open-button w3-teal" onClick={this.openChatBox}> Chat </button>

            <div className="chat-popup form-container" id="myForm">
                <h1> Hi, </h1>
                <label htmlFor="msg"> <b> How can I help you? </b> </label>

                <textarea placeholder={"Type message..."} name="msg" required> </textarea>
                <button onClick={this.sendMessage} className="btn w3-teal"> Send </button>
                <button type="button" className="btn cancel w3-teal" onClick={this.closeChatBox}> Close </button>
            </div> 

        </div>
    )
  }
}

export default Home