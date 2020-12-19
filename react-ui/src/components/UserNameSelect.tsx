import { useState, Dispatch, SetStateAction } from "react";
import { responseToJSON, logError } from "../helpers/responseHelpers";
import * as Constants from "../helpers/constants";
import { IRoom } from "../../../server/models/room";

interface UserNameSelectProps {
  users: IRoom['users'];
  roomName: IRoom['name'];
  setUserName: Dispatch<SetStateAction<string>>;
  setRoomData: Dispatch<SetStateAction<IRoom | undefined>>;
}

const UserNameSelect = ({ users, roomName, setUserName, setRoomData }: UserNameSelectProps) => {
  const [userNameInput, setUserNameInput] = useState('');

  const saveAndSetUserName = (userName: string) => {
    if (userName) {
      // Save selected username for this room to localStorage
      const storedUserNames = JSON.parse(window.localStorage.getItem(Constants.localStorageRoomToUserKey) || '{}');
      storedUserNames[roomName] = userName;
      window.localStorage.setItem(Constants.localStorageRoomToUserKey, JSON.stringify(storedUserNames));
      fetch('/api/add-user?' + new URLSearchParams({ userName: userName, roomName: roomName }), { method: 'POST' })
      .then(responseToJSON)
      .then((data: IRoom) => {
        setRoomData(data);
        setUserName(userName);
      })
      .catch(logError);
    }
  };

  return (
    <div>
      <div>Select username:</div>
      {
      users.map((user) => {
        return (
          <div key={user} onClick={() => saveAndSetUserName(user)}>
            {user}
          </div>
        );
      })
      }
      <form onSubmit={(e) => {
        e.preventDefault();
        saveAndSetUserName(userNameInput);
      }}>
        <input
          type="text"
          placeholder="Username"
          value={userNameInput}
          onChange={e => setUserNameInput(e.target.value)}>
        </input>
      </form>
    </div>
  );
};
export default UserNameSelect;
