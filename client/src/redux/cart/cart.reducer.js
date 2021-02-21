/* eslint-disable no-unreachable */
import { cleareItemFromCart, removeItem } from './cart.actions';
import CartActionTypes from './cart.types';
import { addItemToCart, removeItemFromCart } from './cart.util';

const INITIAL_STATE = {
  hidden: true,
  cartItems: [],
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.TOGGOLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden,
      };
      break;

    case CartActionTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload),
      };
      break;

    case CartActionTypes.REMOVE_ITEM:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, action.payload),
      };
      break;

    case CartActionTypes.CLEAR_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload.id
        ),
      };
      break;

    default:
      return state;
      break;
  }
};

export default cartReducer;
