import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */

const GET_CHEESES = 'GET_CHEESES'
const UPDATE_CHEESE = 'UPDATE_CHEESE'
const ADD_CHEESE = 'ADD_CHEESE'

/**
 * INITIAL STATE
 */
const defaultCheeses = []

/**
 * ACTION CREATORS
 */

const getCheeses = cheeses => ({ type: GET_CHEESES, cheeses })
const updateCheese = (id,changes) => ({ type: REMOVE_CHEESE, id, changes })
const addCheese = cheese => ({type: ADD_CHEESE, cheese})

/**
 * THUNK CREATORS
 */

export const UpdateCheese = (id, changes) =>{
  return dispatch =>
    axios.put(`/api/cheeses/${id}`, changes)
      .then(res => {
        dispatch(updateCheese(changes))
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))}

export const AddCheese = (cheese) =>{
  return dispatch =>
    axios.post(`/api/cheeses/`, cheese)
      .then(res => {
        dispatch(addCheese(res))
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))}

export const GetCheeses = () => {
  return dispatch =>
    axios.get(`/api/cheeses/`)
      .then(res => {
        dispatch(getCheeses(res))
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))}


/**
 * REDUCER
 */
export default function (state = defaultCheeses, action) {
  switch (action.type) {
    case GET_CHEESES:
      return action.cheeses
    case UPDATE_CHEESE:
      return state.map(v=>{
        return (v.id === action.id)? Object.assign({}, v, action.changes) : v
      })
    case ADD_CHEESE:
      return state.concat(action.cheese)
    default:
      return state
  }
}
