import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Room from './Room';
import generateName from '../helper/nameGenerator';
import './App.css';

const App = () => {
  const createNewRoom = async () => {
    // Find a room name that is not in use
    let exists = true;
    while (exists) {
      const name = generateName();
      const response = await fetch(`/api/exists/${name}`);
      exists = await response.json();
    }
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div className="App">
            <header className="App-header">
              <p>Welcome!</p>
              <p>Trying to decide what your group should play? Where to go? What to do? Make a new room and vote on it!</p>
              <button onClick={createNewRoom}>Create Room</button>
            </header>
          </div>
        </Route>
        <Route path="/room/:room">
          <Room />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
