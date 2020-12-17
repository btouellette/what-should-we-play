import { useState } from "react";
import { useHistory } from "react-router-dom";
import { responseToText, logError } from "../helpers/responseHelpers";

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
    <div className="App">
      <header className="App-header">
        <p>Welcome!</p>
        <p>Trying to decide what your group should play? Where to go? What to do? Make a new room and vote on it!</p>
        <button onClick={createNewRoom} disabled={executing}>Create Room</button>
      </header>
    </div>
  );
};

export default HomePage;