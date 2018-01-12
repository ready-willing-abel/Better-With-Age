import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
<<<<<<< HEAD
import user from './user'
import purchases from './purchases'
=======
>>>>>>> 1a8c19362cc37f4f5d73fd9e76d941f4c32565ae
import cheeses from './cheeses'
import purchases from './purchases'
import user from './user'

const reducer = combineReducers({user, purchases,  cheeses})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
