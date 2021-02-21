import CartActionTypes from './cart.types';

export const toggleCartHidden = () => ({
  type: CartActionTypes.TOGGOLE_CART_HIDDEN,
});

export const addItem = (item) => ({
  type: CartActionTypes.ADD_ITEM,
  payload: item,
});
