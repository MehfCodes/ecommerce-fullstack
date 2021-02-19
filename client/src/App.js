import { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/header/header';
import Authentication from './pages/authentication/authentication';
import Home from './pages/home/home';
import Shop from './pages/shop/shop';
import { auth, userProfileDocument } from './firebase/firebase.util';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';

class App extends Component {
  unsubscribeFromAuth = null;
  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await userProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      }

      setCurrentUser({ userAuth });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/shop/hats" component={Hats} />
          <Route path="/shop" component={Shop} />
          <Route path="/signin" component={Authentication} />
        </Switch>
      </div>
    );
  }
}
const mapDispatchToProps = (distpatch) => ({
  setCurrentUser: (user) => distpatch(setCurrentUser(user)),
});
export default connect(null, mapDispatchToProps)(App);

function Hats(props) {
  // console.log(props);
  return <div>hats page</div>;
}
