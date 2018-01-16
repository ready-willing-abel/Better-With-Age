import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */

const GET_USERS = 'GET_USERS'
const UPDATE_A_USER = 'UPDATE_A_USER'
const DELETE_USER = 'DELETE_USER'

/**
 * INITIAL STATE
 */
const defaultUsers = []

/**
 * ACTION CREATORS
 */

const getUsers = users => ({ type: GET_USERS, users })
const updateAUser = (id, changes) => ({ type: UPDATE_A_USER, id, changes })
const deleteUser = id => ({ type: DELETE_USER, id })

/**
 * THUNK CREATORS
 */

export const UpdateAUser = (id, changes) => {
  return dispatch =>
    axios.put(`/api/users/${id}`, changes)
      .then(res => {
        dispatch(updateAUser(id, changes))
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))
}

export const DeleteUser = (id) => {
  return dispatch =>
    axios.delete(`/api/users/${id}`)
      .then(res => {
        dispatch(deleteUser(id))
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))
}

export const GetUsers = () => {
  return dispatch =>
    axios.get(`/api/users/`)
      .then(res => {
        dispatch(getUsers(res.data))
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))
}


/**
 * REDUCER
 */
export default function (state = defaultUsers, action) {
  switch (action.type) {
    case GET_USERS:
      return action.users
    case UPDATE_A_USER:
      return state.map(v => {
        return (v.id === action.id) ? Object.assign({}, v, action.changes) : v
      })
    case DELETE_USER:
      return state.filter(v=>v.id!==action.id)
    default:
      return state
  }
}
