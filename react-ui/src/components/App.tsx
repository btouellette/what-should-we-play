import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Room from './Room';
import HomePage from './HomePage';
import './App.css';
import '../assets/css/main.css';

const App = () => {
  return (
    <div id="wrapper">
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/:roomName" component={Room} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
