import { setItem } from '../../utils/localStorage';

export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToAdd.id
  );
  let items;
  if (existingCartItem) {
    items = cartItems.map((cartItem) =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  } else {
    items = [...cartItems, { ...cartItemToAdd, quantity: 1 }];
  }
  setItem('cart', items, 'cartItems');
  return items;
};

export const removeItemFromCart = (cartItems, cartItemsToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemsToRemove.id
  );

  let items;

  if (existingCartItem.quantity === 1) {
    items = cartItems.filter(
      (cartItem) => cartItem.id !== cartItemsToRemove.id
    );
  } else {
    items = cartItems.map((cartItem) =>
      cartItem.id === cartItemsToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  }
  setItem('cart', items, 'cartItems');
  return items;
};

export const cleareItemFromCart = (cartItems, cartItemsToRemove) => {
  const items = cartItems.filter(
    (cartItem) => cartItem.id !== cartItemsToRemove.id
  );
  setItem('cart', items, 'cartItems');
  return items;
};
