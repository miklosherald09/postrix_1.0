import { createStore, applyMiddleware, compose } from 'redux'
import app from './reducers'
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(){
  let store = createStore(app, composeEnhancers(
    applyMiddleware(thunk)
  ))
  return store
}