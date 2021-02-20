import Button from '../button/button';
import './cart-dropdown.scss';
function CartDropDown() {
  return (
    <div className="cart-dropdown">
      <div className="cart-items"></div>
      <Button>GO TO CHECKOUT</Button>
    </div>
  );
}

export default CartDropDown;
