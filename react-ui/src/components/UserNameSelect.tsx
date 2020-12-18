import { useState } from "react";
import { IRoom } from "../../../server/models/room";

interface UserNameSelectProps {
  users: IRoom['users'];
  onSelectUserName(newUserName: string): void;
}

const UserNameSelect = ({ users, onSelectUserName }: UserNameSelectProps) => {
  const [userNameInput, setUserNameInput] = useState('');

  return (
    <div>
      <div>Select username:</div>
      {
      users.map((user) => {
        return (
          <div key={user} onClick={() => onSelectUserName(user)}>
            {user}
          </div>
        );
      })
      }
      <form onSubmit={(e) => {
        e.preventDefault();
        onSelectUserName(userNameInput);
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
