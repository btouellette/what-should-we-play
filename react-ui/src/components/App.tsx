import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Room from './Room';
import './App.css';

const App = () => {
  const createNewRoom = () => {

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
