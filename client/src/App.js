import { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/header/header';
import Authentication from './pages/authentication/authentication';
import Home from './pages/home/home';
import Shop from './pages/shop/shop';
import { auth, userProfileDocument } from './firebase/firebase.util';
class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
    };
  }
  unsubscribeFromAuth = null;
  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await userProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data(),
            },
          });
        });
      }

      this.setState({ currentUser: userAuth });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
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

export default App;

function Hats(props) {
  // console.log(props);
  return <div>hats page</div>;
}
