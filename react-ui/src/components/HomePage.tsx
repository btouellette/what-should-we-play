import { useHistory } from "react-router-dom";
import generateName from '../helper/nameGenerator';

const HomePage = () => {
  const history = useHistory();

  const createNewRoom = async () => {
    // Find a room name that is not in use
    let exists = true;
    let name = '';
    while (exists) {
      name = generateName();
      const response = await fetch(`/api/exists/${name}`);
      exists = await response.json();
    }
    history.push(`/room/${name}`);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>Welcome!</p>
        <p>Trying to decide what your group should play? Where to go? What to do? Make a new room and vote on it!</p>
        <button onClick={createNewRoom}>Create Room</button>
      </header>
    </div>
  );
};

export default HomePage;