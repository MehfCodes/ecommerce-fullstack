import CartActionTypes from './cart.types';
import { addItemToCart } from './cart.util';

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

    default:
      return state;
      break;
  }
};

export default cartReducer;
