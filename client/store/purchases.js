import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */

const GET_PURCHASES = 'GET_PURCHASES'
const DELETE_PURCHASE = 'DELETE_PURCHASE'
const UPDATE_PURCHASE = 'UPDATE_PURCHASE'
const ADD_PURCHASE = 'ADD_PURCHASE'

/**
 * INITIAL STATE
 */
const defaultPurchases = []

/**
 * ACTION CREATORS
 */

 const getPurchases = (purchases) => ({type: GET_PURCHASES, purchases})
 const deletePurchase = (id) => ({type: DELETE_PURCHASE, id})
 const updateOrder = (id, changes) => ({type: UPDATE_PURCHASE, id,changes})
 const addOrder = (purchase) => ({type: ADD_PURCHASE, purchase})

/**
 * THUNK CREATORS
 */

  export const GetPurchasesAll = () =>{
  return dispatch =>
    axios.get(`/api/purchases/`)
      .then(res => {
        dispatch(getPurchases(res))
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))}


 export const GetUnorderedPurchasesUser = (userId) => {
   return dispatch =>
     axios.get(`/api/purchases/user/cart/${userId}`)
       .then(res => {
         dispatch(getPurchases(res.data))
       })
       .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))
  }


 export const GetOldPurchasesUser = (userId) =>{
   return dispatch =>
     axios.get(`/api/purchases/user/history/${userId}`)
       .then(res => {
         dispatch(getPurchases(res.data))
       })
       .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))}

export const UpdatePurchase = (id, changes) =>{
  return dispatch =>
    axios.put(`/api/purchases/${id}`, changes)
      .then(updated => {
        dispatch(updateOrder(id,changes))
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))}

export const AddPurchase = (purchaseInfo,price) =>{
  return dispatch =>
    axios.post(`/api/purchases/`, purchaseInfo)
      .then(res => {
        dispatch(addOrder(res.data))
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))}

export const DeletePurchase = (id) =>{
  return dispatch =>
    axios.delete(`/api/purchases/${id}`)
      .then(res => {
        dispatch(deletePurchase(id))
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))}


/**
 * REDUCER
 */
export default function (state = defaultPurchases, action) {
  switch (action.type) {
    case GET_PURCHASES:
      return action.purchases.slice()
    case DELETE_PURCHASE:
      return state.filter(v => v.id !== action.id)
    case UPDATE_PURCHASE:
      return state.map(v => {
        return (v.id === action.id) ? Object.assign({},v, action.changes) : v
      })
    case ADD_PURCHASE:
      return state.concat(action.purchase)
    default:
      return state
  }
}
