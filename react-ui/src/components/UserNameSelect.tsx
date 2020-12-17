import { useState, Dispatch, SetStateAction } from "react";
import { IRoom } from "../../../server/models/room";

export interface UserNameSelectProps {
  users: IRoom['users'];
  setUserName: Dispatch<SetStateAction<string>>;
}

const UserNameSelect = ({ users, setUserName }: UserNameSelectProps) => {
  const [userNameInput, setUserNameInput] = useState('');

  return (
    <div>
      <div>Select username:</div>
      {
      users.map((user) => {
        return (
          <div key={user} onClick={() => setUserName(user)}>
            {user}
          </div>
        );
      })
      }
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
};
export default UserNameSelect;
