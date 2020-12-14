import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { responseToJSON, logError } from "../helpers/promiseHelpers";
import { IRoom } from "../../../server/models/room";

const Room = () => {
  // Access the dynamic pieces of the URL
  let { roomName } = useParams<Record<string, string>>();
  const [roomData, setRoomData] = useState<IRoom | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [userNameInput, setUserNameInput] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    fetch('/api/get-room?' + new URLSearchParams({ name: roomName }), { method: 'GET' })
    .then(responseToJSON)
    .then((data: IRoom) => { setRoomData(data); })
    .catch(logError)
    .finally(() => { setLoading(false); });
  }, [roomName]);

  // TODO: extract Loading, RoomError, UserNameSelect to separate components and use routing
  if (loading) {
    return (
      <div>Loading</div>
    );
  } else if (!roomData) {
    return (
      <div>Could not find room: {roomName}</div>
    );
  } else if (!userName) {
    return (
      <div>
        <div>Select username:</div>
        { roomData.users.map((user) => {
            return (
              <div key={user}>
                {user}
              </div>
            );
          }) }
          <form onSubmit={() => { setUserName(userNameInput); }}>
            <input
              type="text"
              placeholder="Username"
              value={userNameInput}
              onChange={e => setUserNameInput(e.target.value)}>
            </input>
          </form>
      </div>
    );
  } else {
    return (
      <div>
        <h3>ID: {roomName}</h3>
      </div>
    );
  }
}

export default Room;
