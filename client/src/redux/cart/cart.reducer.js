/* eslint-disable no-unreachable */
import { getItem, initialSetItem } from '../../utils/localStorage';
import CartActionTypes from './cart.types';
import {
  addItemToCart,
  cleareItemFromCart,
  removeItemFromCart,
} from './cart.util';

const INITIAL_STATE = {
  hidden: getItem('cart', 'hidden') ?? true,
  cartItems: getItem('cart', 'cartItems') ?? [],
};

initialSetItem('cart', INITIAL_STATE);

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
        cartItems: cleareItemFromCart(state.cartItems, action.payload),
      };
      break;

    default:
      return state;
      break;
  }
};

export default cartReducer;
