import { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Header from './components/header/header';
import Authentication from './pages/authentication/authentication';
import Home from './pages/home/home';
import Shop from './pages/shop/shop';
import CheckoutPage from './pages/checkout/checkout';
import { connect } from 'react-redux';
import { selectCurrentUser } from './redux/user/user.selector';
import { createStructuredSelector } from 'reselect';
import { setCurrentUser } from './redux/user/user.actions';
import { getCookie } from './utils/cookie';
class App extends Component {
  componentDidMount() {
    const jwt = getCookie('jwt');
    this.props.setIsLogin(jwt);
  }
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/shop" component={Shop} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route
            path="/Login"
            render={() =>
              this.props.isLogin ? <Redirect to="/" /> : <Authentication />
            }
          />
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  isLogin: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setIsLogin: (token) => dispatch(setCurrentUser(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
