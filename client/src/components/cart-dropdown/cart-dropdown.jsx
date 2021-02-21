import Button from '../button/button';
import './cart-dropdown.scss';
import { connect } from 'react-redux';
import CartItem from '../cart-item/cart-items';
function CartDropDown({ cartItems }) {
  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {cartItems.map((cartItem) => {
          return <CartItem key={cartItem.id} item={cartItem} />;
        })}
      </div>
      <Button>GO TO CHECKOUT</Button>
    </div>
  );
}

const mapStateToProps = ({ cart: { cartItems } }) => ({
  cartItems,
});
export default connect(mapStateToProps)(CartDropDown);
