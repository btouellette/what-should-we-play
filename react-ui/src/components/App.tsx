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
        <Route exact path="/" component={HomePage} />
        <Route path="/:roomName" component={Room} />
      </Switch>
    </Router>
  );
}

export default App;
