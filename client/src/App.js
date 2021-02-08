import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/header/header';
import Authentication from './pages/authentication/authentication';
import Home from './pages/home/home';
import Shop from './pages/shop/shop';

function App() {
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

export default App;

function Hats(props) {
  console.log(props);
  return <div>hats page</div>;
}
