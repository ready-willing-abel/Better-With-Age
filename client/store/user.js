import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */

const ADD_USER = 'ADD_USER'
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const UPDATE_USER = 'UPDATE_USER'

/**
 * INITIAL STATE
 */

const defaultUser = {}

/**
 * ACTION CREATORS
 */

const addUser = user => ({type:ADD_USER, user})
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const updateUser = changes => ({ type: UPDATE_USER, changes })

/**
 * THUNK CREATORS
 */
export const me = () =>{
  return dispatch =>
    axios.get('/auth/me')
      .then(res =>
        dispatch(getUser(res.data || defaultUser)))
      .catch(err => console.log(err))}

export const auth = (email, password, method) =>{
  return dispatch =>
    axios.post(`/auth/${method}`, { email, password })
      .then(res => {
        dispatch(getUser(res.data))
        history.push('/')
      }, authError => { // rare example: a good use case for parallel (non-catch) error handler
        dispatch(getUser({error: authError}))
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))}

export const logout = () =>{
  return dispatch =>
    axios.post('/auth/logout')
      .then(_ => {
        dispatch(removeUser())
        history.push('/login')
      })
      .catch(err => console.log(err))}

export const Update = (id, changes) =>{
  return dispatch =>
    axios.put(`/api/users/${id}`, changes)
      .then(res => {
        dispatch(updateUser(changes))
        history.push(/*NEED A ROUTE FOR THIS*/)
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))}

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case ADD_USER:
      return defaultUser
    case UPDATE_USER:
      return Object.assign({},defaultUser,action.changes)
    case REMOVE_USER:
      return {}
    default:
      return state
  }
}
