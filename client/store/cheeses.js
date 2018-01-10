import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CHEESES = 'GET_CHEESES'
const REMOVE_CHEESE = 'REMOVE_CHEESE'
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
const removeCheese = (id) => ({ type: REMOVE_CHEESE, id })
const updateCheese = changes => ({ type: REMOVE_CHEESE, id, changes })
const addCheese = cheese => ({type: ADD_CHEESE, cheese})

/**
 * THUNK CREATORS
 */

export const UpdateCheese = (id, changes) =>
  dispatch =>
    axios.put(`/cheeses/${id}`, changes)
      .then(res => {
        dispatch(updateCheese(changes))
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

export const AddCheese = (cheese) =>
  dispatch =>
    axios.post(`/cheeses/`, cheese)
      .then(res => {
        dispatch(addCheese(res))
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

export const GetCheeses = () =>
  dispatch =>
    axios.get(`/cheeses/`)
      .then(res => {
        dispatch(getCheeses(res))
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

export const RemoveCheeses = (id) =>
  dispatch =>
    axios.delete(`/cheeses/${id}`)
      .then(res => {
        dispatch(removeCheeses(res))
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))


/**
 * REDUCER
 */
export default function (state = defaultCheeses, action) {
  switch (action.type) {
    case GET_CHEESES:
      return action.cheeses
    case REMOVE_CHEESE:
      return state.filter(v=>v.id!==action.id)
    case UPDATE_CHEESE:
      return state.filter(v=>{
        return (v.id === action.id)? Object.assign({}, v, action.changes) : v
      })
    case ADD_CHEESE:
      return state.concat(action.cheese)
    default:
      return state
  }
}
