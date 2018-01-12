import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */

const CREATE_CART = 'CREATE_CART'
const UPDATE_QUANTITY = 'UPDATE_QUANTITY'
const GET_CART = 'GET_CART'
const CLEAR_CART = 'CLEAR_CART'

/**
 * INITIAL STATE
 */

const defaultCart = {}

/**
 * ACTION CREATORS
 */

const createCart = (cart) => ({type: CREATE_CART, cart})
const UpdateQuantityInCart = (id, amount) => ({ type: UPDATE_QUANTITY , id, amount })
const getUsersCart = cart => ({ type: GET_CART, cart })
const clearCart = () => ({ type: CLEAR_CART})

/**
 * THUNK CREATORS
 */

export const GetCart = (id) =>
  dispatch =>
    axios.get(`/cart/:${id}`)
      .then(res => {
        let cart = res.reduce((a,b)=>{
          if(a[b.cheeseId] && b.quantity>0) a[b.cheeseId]+= b.quantity
          else a[b.cheeseId] = b.quantity
          return a
        },{})
        dispatch(getUsersCart(cart))
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

export const UpdateCart = (userId,cheeseId, amount) =>
  dispatch =>
    axios.put(`/cart/:${userId}|${cheeseId}`, {quantity: amount})
      .then(res => {
        dispatch(UpdateQuantityInCart(id,amount))
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

export const AddToCart = (userId, cheeseId) =>
//CG be careful with additional /
  dispatch =>
    axios.post(`/cart/`, { userId, cheeseId })
      .then(res => {
        dispatch(createCart(cheeseId))
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

export const ClearCart = (userId) =>
  dispatch =>
    axios.post(`/cart/`, { userId })
      .then(res => {
        id = res.cheeseId
        dispatch(clearCart())
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

/**
 * REDUCER
 */
export default function (state = defaultCart, action) {
  switch (action.type) {
    case CREATE_CART:
      newState = Object.assign({},state)
      Object.defineProperty(newState,action.cheeseId,{value:1})
      return newState
    case UPDATE_QUANTITY:
      return Object.keys(state).reduce((a,b)=>{
        if(b===action.id) a[b]=amount
        return a
      },state)
    case GET_CART:
      return action.cart
    case CLEAR_CART:
      return {}
    default:
      return state
  }
}
