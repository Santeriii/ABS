import React from 'react'
import Nav from './components/Nav'
import NestedGrid from './components/Grid'
import './css/App.css'
import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom'
import Details from './components/Details'
import Info from './components/Info'

const App = () => {

  return (
    <Router>
      <div className='App'>
        <Nav />

        <Switch>
          <Route path="/info">
            <Info />
          </Route>
          <Route path="/details">
              <Details />
          </Route>
          <Route path="/">
            <NestedGrid />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App