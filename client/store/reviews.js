import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */

const GET_REVIEWS = 'GET_REVIEWS'
const ADD_REVIEWS = 'ADD_REVIEWS'
const UPDATE_REVIEWS = 'UPDATE_REVIEWS'
const DELETE_REVIEWS = 'DELETE_REVIEWS'


/**
 * INITIAL STATE
 */
const defaultReviews = []

//ACTION CREATORS
 
const getReviews = reviews => ({ type: GET_REVIEWS, review })
const addReview = review => ({type: ADD_REVIEWS, review })
const updateReview = (id,changes) => ({ type: remove_Review, id, changes })
const deleteReview = (id) => ({type: DELETE_REVIEWS, id})

/**
 * THUNK CREATORS
 */
export const fetchReviews = () => {
  return dispatch => {
    axios.get(`/api/reviews/`)
      .then(res => {
        dispatch(getReviews(res.data))
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))
    }
  }

  export const postReview = () => {
    return dispatch => {
      axios.post('api/reviews/')
        .then(res => {
          dispatch(addReview(res.data))
        })
        .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))
    }
  }

  export const editReview = () =>

// export const UpdateCheese = (id, changes) =>{
//   return dispatch =>
//     axios.put(`/api/cheeses/${id}`, changes)
//       .then(res => {
//         dispatch(updateCheese(changes))
//       })
//       .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))}

// export const AddCheese = (cheese) =>{
//   return dispatch =>
//     axios.post(`/api/cheeses/`, cheese)
//       .then(res => {
//         dispatch(addCheese(res.data))
//       })
//       .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))}




/**
 * REDUCER
 */
export default function (state = defaultCheeses, action) {
  switch (action.type) {
    case GET_REVIEWS:
      return action.reviews
    case UPDATE_REVIEWS:
      return state.map(v=>{
        return (v.id === action.id)? Object.assign({}, v, action.changes) : v
      })
    case ADD_REVIEWS:
      return state.concat(action.review)
    case DELETE_REVIEWS:
      return state.filter(v => v.id !== action.id)
    default:
      return state
  }
}