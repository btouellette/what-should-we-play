import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Room from './Room';
import HomePage from './HomePage';
import './App.css';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/:roomName">
          <Room />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
