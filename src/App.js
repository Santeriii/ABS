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
import {
  BrowserView,
  MobileView
} from "react-device-detect";

const App = () => {

  return (
    <Router>
      <BrowserView>
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
      </BrowserView>
      <MobileView>
        <div className='App__mobile'>
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
      </MobileView>
    </Router>
  )
}

export default App