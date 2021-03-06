import { useEffect, useState, useMemo, createRef } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import RoomNotFound from "./RoomNotFound";
import UserNameSelect from "./UserNameSelect";
import VotingOptionRow from "./VotingOptionRow";
import UserList from "./UserList";
import AnimateRows from "./AnimateRows";
import * as Constants from "../helpers/constants";
import { responseToJSON, logError } from "../helpers/responseHelpers";
import { IRoom } from "../../../server/models/room";
import './Room.css';

const Room = () => {
  // Access the dynamic pieces of the URL
  const { roomName } = useParams<Record<string, string>>();
  // Set up state for Room component
  // All relevant information about the room (pulled from the backend)
  const [roomData, setRoomData] = useState<IRoom | undefined>(undefined);
  // Flag to determine if loading is complete or not
  const [loading, setLoading] = useState(true);
  // Username selected for this room
  const [userName, setUserName] = useState('');
  // User input for new option to add to vote on
  const [optionInput, setOptionInput] = useState('');
  // Create refs to get DOM elements for sub-divs
  const refs = useMemo(
    () => Array.from(Array(roomData?.options.length), () => createRef<HTMLDivElement>()),
    [roomData?.options.length]
  );

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
    //TODO: add to top at first then animated transition to correct placement (to show user it was added on long lists)
    // Check if option already exists
    if (name.length > 0 && !roomData?.options.some((option) => option.name === name)) {
      // Save to backend
      fetch('/api/add-option?' + new URLSearchParams({ optionName: name, userName: userName, roomName: roomName }), { method: 'POST' })
      .then(responseToJSON)
      .then((data: IRoom) => {
        setRoomData(data);
        setOptionInput('');
      })
      .catch(logError);
    }
  };

  return (
    <div className="Room">
      <div className="Room-wrapper">
        <div className="Room-main">
          <section className="Room-section">
          {
            loading   ? <Loading /> :
            !roomData ? <RoomNotFound name={roomName} /> :
            !userName ? <UserNameSelect users={roomData.users} roomName={roomName} setUserName={setUserName} setRoomData={setRoomData} /> :
            <div>
              <UserList users={roomData.users} />

              <form onSubmit={(e) => {
                e.preventDefault();
                addNewOption(optionInput);
              }}>
                <input
                  type="text"
                  placeholder="New option"
                  maxLength={100}
                  value={optionInput}
                  onChange={e => setOptionInput(e.target.value)}>
                </input>
              </form>

              <AnimateRows>
              {
                roomData.options.sort((a, b) => b.userVotes.length - a.userVotes.length).map((option, index) => (
                  <VotingOptionRow key={option.name} option={option} userName={userName} roomName={roomName} setRoomData={setRoomData} ref={refs[index]}/>
                ))
              }
              </AnimateRows>
            </div>
          }
          </section>
        </div>
      </div>
    </div>
  );
}

export default Room;
