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
const defaultReviews = [];

//ACTION CREATORS
 
const getReviews = reviews => ({ type: GET_REVIEWS, reviews })
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

  export const editReview = (id, changes) => {
    return dispatch => {
      axios.put(`/api/reviews/${id}`, changes)
        .then(res => {
          dispatch(updateReview(res.data))
        })
        .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))
    }
  }

  export const removeReview = (id) => {
    return dispatch => {
      axios.delete(`/api/reviews/${id}`)
        .then(res => {
          dispatch(deleteReview(res.data))
        })
        .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))
    }
  }

/**
 * REDUCER
 */
export default function (state = defaultReviews, action) {
  switch (action.type) {
    case GET_REVIEWS:
      return action.reviews;
    case UPDATE_REVIEWS:
      return state.map(review => {
        return (review.id === action.id) ? Object.assign({}, review, action.changes) : review
      })
    case ADD_REVIEWS:
      return state.concat(action.review)
    case DELETE_REVIEWS:
      return state.filter(v => v.id !== action.id)
    default:
      return state
  }
}