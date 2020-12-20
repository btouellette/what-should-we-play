import { useState, Dispatch, SetStateAction } from "react";
import { responseToJSON, logError } from "../helpers/responseHelpers";
import * as Constants from "../helpers/constants";
import { IRoom } from "../../../server/models/room";
import './UserNameSelect.css'

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
      <div>New here?</div>
      <form onSubmit={(e) => {
        e.preventDefault();
        saveAndSetUserName(userNameInput);
      }}>
        <input
          type="text"
          placeholder="Enter name"
          value={userNameInput}
          onChange={e => setUserNameInput(e.target.value)}>
        </input>
      </form>
      <div>Been here before?</div>
      {
      users.map((user) => {
        return (
          <button className="button UserNameSelect-button" key={user} onClick={() => saveAndSetUserName(user)}>
            {user}
          </button>
        );
      })
      }
    </div>
  );
};
export default UserNameSelect;
