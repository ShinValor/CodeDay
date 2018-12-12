import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css'
import Home from './routes/Home'
import Recipe from './routes/Recipe'
import UrlRecipe from './routes/UrlRecipe'

class App extends Component {
  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/recipe' component={Recipe}/>
          <Route path='/url_recipe' component={UrlRecipe}/>
        </Switch>
      </div>
    )
    return (
      <Switch>
        <App/>
      </Switch>
    )
  }
}

export default App