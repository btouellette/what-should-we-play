import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/:room">
          <Room />
        </Route>
      </Switch>
    </Router>
  );
}

function HomePage() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Welcome!</p>
        <p>Trying to decide what your group should play? Where to go? What to do? Make a new room vote on it!</p>
        <button>Create Room</button>
      </header>
    </div>
  );
}

function Room() {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { room } = useParams<Record<string, string>>();

  return (
    <div>
      <h3>ID: {room}</h3>
    </div>
  );
}

export default App;
