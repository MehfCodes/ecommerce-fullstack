import { Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/home";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/shop/hats" component={Hats} />
      </Switch>
    </div>
  );
}

export default App;

function Hats(props) {
  console.log(props);
  return <div>hats page</div>;
}
