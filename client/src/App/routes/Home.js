import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import SearchBar from 'react-js-search';

class Home extends Component {
  // Initialize the state
  constructor(props) {
    super(props)
    this.state = {
      recipes : [],
      url : "",
      message : "",
      reply : "",
      feedback : []
    }
  }

  getRecipes = (recipeName) => {
    fetch('/recipe',{
      method : 'POST',
      body : JSON.stringify({
        'recipeName' : recipeName
      }),
      headers : {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(recipe => {
      this.setState({
        recipes: recipe
      })
    })
  }

  w3_open = () => {
    document.getElementById("mySidebar").style.display = "block"
  }
  w3_close = () => {
    document.getElementById("mySidebar").style.display = "none"
  }

  handleChange(event) {
    this.setState({message: event.target.value})
  }

  sendMessage = (message) => {
    fetch('/message',{
      method : 'POST',
      body : JSON.stringify({
        'message' : message
      }),
      headers : {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(res => {
      this.setState({
        reply : res[0],
        feedback : res[1]
      })
      console.log(this.state.reply)
      console.log(this.state.feedback)
    })        
  }    

  openChatBox = () => {
    document.getElementById("myForm").style.display = "block"
  }

  closeChatBox = () => {
    document.getElementById("myForm").style.display = "none"
  }

  loginPopup = () => {
    document.getElementById('login').style.display='block'
  }

  loginPopupExit = () => {
    document.getElementById('login').style.display='none'
  }

  noPassword = () => {
    alert("HAHAHA TOO BAD")
  }

  render() {

    const recipes = this.state.recipes.map((recipe,index) => {
      return (
        <Link className="link-btn" key={index} to={{ pathname : "/recipe", state : {recipe : Object.keys(recipe)[0], recipeID : Object.values(recipe)[0]} }}> 
          <p> <strong> {Object.keys(recipe)[0]} </strong> </p>
        </Link>
      )
    })

    if (this.state.url) {
      return (
        <Redirect to={{ 
          pathname : '/url_recipe',
          state : {recipeUrl : this.state.url} 
        }}/>
      )
    }

    return (
      <div>
        <div className="colorStrip">
          <button className="menu" onClick={this.w3_open}> ☰ </button>
          <h1 className="title"> PieceMeal </h1>
          <button className="login-button" onClick={this.loginPopup}> Login </button>
        </div>

        <div className="w3-sidebar w3-bar-block w3-border-right w3-orange" style={{display : 'none'}} id="mySidebar">
          <button className="w3-bar-item w3-large w3-teal" onClick={this.w3_close}> Close </button>
          <a className="w3-bar-item w3-button" href="/"> Home </a>
          <a className="w3-bar-item w3-button" href="https://github.com/ShinValor/piecemeal#piecemeal" target="_blank" rel="noopener noreferrer"> About Us </a>
          <a className="w3-bar-item w3-button" href="https://github.com/ShinValor/piecemeal#user-types" target="_blank" rel="noopener noreferrer"> Services </a>
          <a className="w3-bar-item w3-button" href="https://github.com/ShinValor/piecemeal#contributors" target="_blank" rel="noopener noreferrer"> Contact </a>
        </div> 

        <div id="login" className="modal">
          <form className="modal-content animate" action="/action_page.php">
            <div className="imgcontainer">
              <span className="close" title="Close Modal" onClick={this.loginPopupExit}> &times; </span>
              <img className="avatar" src="images/img_avatar.png" alt="Avatar"/>
            </div>

            <div>
              <input className="user-credential" type="text" placeholder="Enter Username" name="uname" required/>
              <br/>
              <input className="user-credential" type="password" placeholder="Enter Password" name="psw" required/>
              <br/>
              <button className="login-button2" type="submit"> Login </button>
              <br/>
              <br/>
              <span className="psw"> <a href="/" onClick={this.noPassword}> Forgot password? </a> </span>
            </div>
          </form>
        </div>

        <a href="/"> <img className="icon" src="images/icon.png" alt="icon" href="/"/> </a>

        <div className="searchBox">
          <SearchBar 
            onSearchTextChange={(newValue) => this.setState({recipeName : newValue})}
            onSearchButtonClick={this.getRecipes.bind(this,this.state.recipeName)}
            placeHolderText={"Search recipe"}
          />
        </div>


        <div className="searchBox">
          <SearchBar 
            onSearchTextChange={(newValue) => this.setState({value : newValue})}
            onSearchButtonClick={() => this.setState({url : this.state.value})}
            placeHolderText={"Enter Url"}
          />
        </div>

        <div className="box-text">
            {recipes}
        </div>

        <button className="open-button" onClick={this.openChatBox}> Chat </button>

        <div className="chat-popup form-container" id="myForm">
          <h2> Hello </h2>
          <label htmlFor="msg"> <b> Hi, how can I help you? </b> </label>
          <textarea className="botMessage" disabled={true} placeholder={this.state.reply}/>
          <textarea className="userMessage" type="text" name="msg" value={this.state.msg} onChange={this.handleChange.bind(this)} required/>
          <button className="btn" onClick={this.sendMessage.bind(this,this.state.message)}> Send </button>
          <button className="btn cancel" type="button" onClick={this.closeChatBox}> Close </button>
        </div> 
      </div>
    )
  }
}

export default Home