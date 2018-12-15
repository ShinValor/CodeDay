import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import SearchBar from 'material-ui-search-bar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
//import Sidebar from "react-sidebar";
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

    w3_open = () => {
        document.getElementById("mySidebar").style.display = "block";
    }
    w3_close = () => {
        document.getElementById("mySidebar").style.display = "none";
    }

    sendMessage = () => {
        console.log("DID IT SEND MESSAGE")
    }    

    openChatBox = () => {
        document.getElementById("myForm").style.display = "block";
    }

    closeChatBox = () => {
        document.getElementById("myForm").style.display = "none";
    }

    loginPopup = () => {
        document.getElementById('login').style.display='block'
    }

    loginPopupExit = () => {
        document.getElementById('login').style.display='none'
    }

    tooBad = () => {
        alert("HAHAHA TOO BAD")
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
            <div className="colorStrip"> </div>

            <div>
                <button className="w3-button w3-teal w3-xlarge menu" onClick={this.w3_open}> Menu ☰ </button>
                <button className="login-button" onClick={this.loginPopup}> Login </button>
            </div>

            <div className="w3-sidebar w3-bar-block w3-border-right w3-orange" style={{display : 'none'}} id="mySidebar">
                <button onClick={this.w3_close} className="w3-bar-item w3-large w3-teal"> Close </button>
                <a href="/" className="w3-bar-item w3-button"> Home </a>
                <a className="w3-bar-item w3-button" href="https://github.com/ShinValor/piecemeal#piecemeal" target="_blank" rel="noopener noreferrer"> About Us </a>
                <a className="w3-bar-item w3-button" href="https://github.com/ShinValor/piecemeal#user-types" target="_blank" rel="noopener noreferrer"> Services </a>
                <a className="w3-bar-item w3-button" href="https://github.com/ShinValor/piecemeal#contributors" target="_blank" rel="noopener noreferrer"> Contact </a>
            </div> 


            <div id="login" className="modal">
                <form className="modal-content animate" action="/action_page.php">
                    <div className="imgcontainer">
                        <span onClick={this.loginPopupExit} className="close" title="Close Modal"> &times; </span>
                        <img className="avatar" src="img_avatar2.png" alt="Avatar"/>
                    </div>

                    <div>
                        <input className="user-credential" type="text" placeholder="Enter Username" name="uname" required/>
                        <br/>
                        <input className="user-credential" type="password" placeholder="Enter Password" name="psw" required/>
                        <br/>
                        <button className="login-button2" type="submit"> Login </button>
                        <br/>
                        <label> <input type="checkbox" checked="checked" name="remember"/> Remember me </label>
                        <br/>
                        <span className="psw"> <a href="#" onClick={this.tooBad}> Forgot password? </a> </span>
                    </div>
                </form>
            </div>

            <a href="/"> <img className="icon" src="icon.png" alt="icon" href="/"/> </a>

            <h1 className="title"> PieceMeal </h1>

            <div className="searchBox"> 
                <MuiThemeProvider className="searchBox">
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
            </div>

            <div className="searchBox">
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
            </div>

            <div className="box-text">
                {recipes}
            </div>

            <button className="open-button" onClick={this.openChatBox}> Chat </button>

            <div className="chat-popup form-container" id="myForm">
                <h1> Hi, </h1>
                <label htmlFor="msg"> <b> How can I help you? </b> </label>
                <textarea placeholder={"Type message..."} name="msg" required> </textarea>
                <button onClick={this.sendMessage} className="btn"> Send </button>
                <button type="button" className="btn cancel" onClick={this.closeChatBox}> Close </button>
            </div> 
        </div>
    )
  }
}

export default Home