import { useState, Dispatch, SetStateAction } from "react";
import { IRoom } from "../../../server/models/room";
import * as Constants from "../helpers/constants";

interface UserNameSelectProps {
  users: IRoom['users'];
  roomName: IRoom['name'];
  setUserName: Dispatch<SetStateAction<string>>;
}

const UserNameSelect = ({ users, roomName, setUserName }: UserNameSelectProps) => {
  const [userNameInput, setUserNameInput] = useState('');

  const saveAndSetUserName = (newUserName: string) => {
    if (newUserName) {
      // Save selected username for this room to localStorage
      const storedUserNames = JSON.parse(window.localStorage.getItem(Constants.localStorageRoomToUserKey) || '{}');
      storedUserNames[roomName] = newUserName;
      window.localStorage.setItem(Constants.localStorageRoomToUserKey, JSON.stringify(storedUserNames));
      //TODO: if username not in room.users save to backend and add
      setUserName(newUserName);
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
