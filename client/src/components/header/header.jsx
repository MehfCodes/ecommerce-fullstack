import { Link, withRouter } from 'react-router-dom';
import { ReactComponent as Logo } from './../../assets/crown.svg';
import './header.scss';
import { connect } from 'react-redux';
import CartIcon from '../cart-icon/cart-icon';
import CartDropDown from '../cart-dropdown/cart-dropdown';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { Logout } from './../../utils/auth';
import { setCurrentUser } from '../../redux/user/user.actions';
function Header({ currentUser, hidden, history, isLogin }) {
  const logouHandler = async () => {
    const { data, error } = await Logout();
    console.log(data, error);
    if (!error) {
      isLogin(false);
      history.push('/');
    }
  };
  return (
    <div className="header">
      <Link className="logo-container" to="/">
        <Logo className="logo" />
      </Link>
      <div className="options">
        <Link className="option" to="/shop">
          SHOP
        </Link>
        <Link className="option" to="/shop">
          CONTACT
        </Link>
        {currentUser ? (
          <div className="option" onClick={logouHandler}>
            LOGOUT
          </div>
        ) : (
          <Link className="option" to="/Login">
            LOGIN
          </Link>
        )}
        <CartIcon />
      </div>
      {hidden ? null : <CartDropDown />}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});
const mapDispatchToProps = (dispatch) => ({
  isLogin: (token) => dispatch(setCurrentUser(token)),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
