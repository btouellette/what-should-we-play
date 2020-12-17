import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import RoomNotFound from "./RoomNotFound";
import UserNameSelect from "./UserNameSelect";
import VotingOption from "./VotingOption";
import { responseToJSON, logError } from "../helpers/responseHelpers";
import { IRoom } from "../../../server/models/room";

const Room = () => {
  // Access the dynamic pieces of the URL
  let { roomName } = useParams<Record<string, string>>();
  const [roomData, setRoomData] = useState<IRoom | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [optionInput, setOptionInput] = useState('');

  useEffect(() => {
    //TODO: load selected username for this room from cookie

    fetch('/api/get-room?' + new URLSearchParams({ name: roomName }), { method: 'GET' })
    .then(responseToJSON)
    .then((data: IRoom) => { setRoomData(data); })
    .catch(logError)
    .finally(() => { setLoading(false); });
  }, [roomName]);

  const saveAndSetUserName = (newUserName: string) => {
    //TODO: save selected username for this room to cookie
    //TODO: if username not in room.users save to backend and add
    setUserName(newUserName);
  };

  const addNewOption = (optionName: string) => {
    //TODO: check if option already exists
    if (optionInput.length > 0) {
      //TODO: save to backend
      const newOption = {
        name: optionName,
        userVotes: [userName]
      };
      roomData?.options.push(newOption);
      setOptionInput('');
    }
  };

  return loading   ? <Loading /> :
         !roomData ? <RoomNotFound name={roomName} /> :
         !userName ? <UserNameSelect users={roomData.users} onSelectUserName={saveAndSetUserName} /> :
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
            <VotingOption option={option} />
          ))
        }
      </div>
    </div>;
}

export default Room;
