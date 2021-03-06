import { useState } from "react";
import { useHistory } from "react-router-dom";
import { responseToText, logError } from "../helpers/responseHelpers";
import './HomePage.css';

const HomePage = () => {
  const history = useHistory();
  const [executing, setExecuting] = useState(false);

  const createNewRoom = async () => {
    setExecuting(true);
    fetch('/api/create-room', { method: 'POST' })
    .then(responseToText)
    .then((name) => { history.push(name); })
    .catch(logError)
    .finally(() => { setExecuting(false); });
  };

  return (
    <div className="HomePage">
      <header id="header" className="alt HomePage-header">
        <h1>What should we play?</h1>
        <p>Trying to decide what your group should play? Where to go? What to do? Make a new room and vote on it!</p>
        <button className="button solid" onClick={createNewRoom} disabled={executing}>Create Room</button>
       </header>
    </div>
  );
};

export default HomePage;