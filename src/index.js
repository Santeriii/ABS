import ReactDOM from 'react-dom'
import App from './App'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import animeReducer from './reducers/animeReducer'
import animeIdReducer from './reducers/animeIdReducer'

const reducer = combineReducers({
  searchTerm: animeReducer,
  animeId: animeIdReducer
})

const store = createStore(reducer)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)