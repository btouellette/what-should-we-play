import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import RoomNotFound from "./RoomNotFound";
import UserNameSelect from "./UserNameSelect";
import VotingOption from "./VotingOption";
import * as Constants from "../helpers/constants";
import { responseToJSON, logError } from "../helpers/responseHelpers";
import { IRoom } from "../../../server/models/room";

const Room = () => {
  // Access the dynamic pieces of the URL
  let { roomName } = useParams<Record<string, string>>();
  // Set up state for Room component
  // All relevant information about the room (pulled from the backend)
  const [roomData, setRoomData] = useState<IRoom | undefined>(undefined);
  // Flag to determine if loading is complete or not
  const [loading, setLoading] = useState(true);
  // Username selected for this room
  const [userName, setUserName] = useState('');
  // User input for new option to add to vote on
  const [optionInput, setOptionInput] = useState('');

  useEffect(() => {
    // Fetch room data for this room
    fetch('/api/get-room?' + new URLSearchParams({ name: roomName }), { method: 'GET' })
    .then(responseToJSON)
    .then((data: IRoom) => {
      // Load selected username for this room from localStorage if present
      const storedUserName = JSON.parse(window.localStorage.getItem(Constants.localStorageRoomToUserKey) || '{}')[roomName];
      if (storedUserName) {
        setUserName(storedUserName);
      }
      setRoomData(data);
    })
    .catch(logError)
    .finally(() => { setLoading(false); });
  }, [roomName]);

  const addNewOption = (name: string) => {
    // Check if option already exists
    if (name.length > 0 && !roomData?.options.some((option) => option.name === name)) {
      // Save to backend
      fetch('/api/add-option?' + new URLSearchParams({ optionName: name, userName: userName, roomName: roomName }), { method: 'POST' })
      .then(responseToJSON)
      .then((data: IRoom) => {
        setRoomData(data);
        setOptionInput('');
      })
    }
  };

  return loading   ? <Loading /> :
         !roomData ? <RoomNotFound name={roomName} /> :
         !userName ? <UserNameSelect users={roomData.users} roomName={roomName} setUserName={setUserName} /> :
    <div>
      <h3>Room: {roomName}</h3>
      <h3>User: {userName}</h3>
      <form onSubmit={(e) => {
        e.preventDefault();
        addNewOption(optionInput);
      }}>
        <input
          type="text"
          placeholder="New option"
          value={optionInput}
          onChange={e => setOptionInput(e.target.value)}>
        </input>
      </form>
      <div>
        {
          roomData.options.map((option) => (
            <VotingOption option={option} userName={userName} />
          ))
        }
      </div>
    </div>;
}

export default Room;
