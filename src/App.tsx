import React from 'react';
import logo from './logo.svg';
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
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
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
