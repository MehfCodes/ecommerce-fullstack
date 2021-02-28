import { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Header from './components/header/header';
import Authentication from './pages/authentication/authentication';
import Home from './pages/home/home';
import Shop from './pages/shop/shop';
import CheckoutPage from './pages/checkout/checkout';

class App extends Component {
  compo;
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/shop" component={Shop} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route path="/signin" render={() => <Authentication />} />
          {/* this.props.currentUser ? <Redirect to="/" /> : */}
        </Switch>
      </div>
    );
  }
}

export default App;
