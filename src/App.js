import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import './App.css'

import TechEraApp from './component/TechEraApp'
import LanguageDetail from './component/LanguageDetail'
import NotFound from './component/NotFound'

// Replace your code here
class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={TechEraApp} />
        <Route exact path="/courses/:id" component={LanguageDetail} />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    )
  }
}

export default App
