import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */

const GET_PURCHASES = 'GET_PURCHASES'
const DELETE_ORDER = 'DELETE_ORDER'
const UPDATE_ORDER = 'UPDATE_ORDER'
const ADD_ORDER = 'ADD_ORDER'

/**
 * INITIAL STATE
 */
const defaultPurchases = []

/**
 * ACTION CREATORS
 */

 const getPurchases = (purchases) => ({type: GET_PURCHASES, purchases})
 const deletePurchase = (id) => ({type: DELETE_ORDER, id})
 const updateOrder = () => ({type: UPDATE_ORDER, })
 const addOrder = () => ({type: ADD_ORDER, })

/**
 * THUNK CREATORS
 */

 export const GetPurchasesOrder = (orderId) =>
   dispatch =>
     axios.get(`/cheeses/order/${orderId}`)
       .then(res => {
         dispatch(getPurchases(res))
         history.push(/*NEED A ROUTE FOR THIS*/)
       })
       .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

 export const GetPurchasesUser = (userId) =>
   dispatch =>
     axios.get(`/cheeses/user/${userId}`)
       .then(res => {
         dispatch(getPurchases(res))
         history.push(/*NEED A ROUTE FOR THIS*/)
       })
       .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

export const UpdatePurchase = (id, changes) =>
  dispatch =>
    axios.put(`/cheeses/${id}`, changes)
      .then(res => {
        dispatch(updateCheese(changes))
        history.push(/*NEED A ROUTE FOR THIS*/)
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

export const AddPurchase = (cheese) =>
  dispatch =>
    axios.post(`/cheeses/`, cheese)
      .then(res => {
        dispatch(addCheese(res))
        history.push(/*NEED A ROUTE FOR THIS*/)
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

export const DeletePurchase = (id) =>
  dispatch =>
    axios.delete(`/purchases/${id}`)
      .then(res => {
        dispatch(deletePurchase(res))
        history.push(/*NEED A ROUTE FOR THIS*/)
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))


/**
 * REDUCER
 */
export default function (state = defaultPurchases, action) {
  switch (action.type) {
    case GET_PURCHASES:
      return action.purchases
    case REMOVE_CHEESE:
      return state.filter(v => v.id !== action.id)
    case UPDATE_CHEESE:
      return state.filter(v => {
        return (v.id === action.id) ? Object.assign({}, v, action.changes) : v
      })
    case ADD_CHEESE:
      return state.concat(action.cheese)
    default:
      return state
  }
}
