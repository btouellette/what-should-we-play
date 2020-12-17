import { useState, Dispatch, SetStateAction } from "react";
import { IRoom } from "../../../server/models/room";

export interface UserNameSelectProps {
  roomData: IRoom;
  setUserName: Dispatch<SetStateAction<string>>;
}

const UserNameSelect = ({ roomData, setUserName }: UserNameSelectProps) => {
  const [userNameInput, setUserNameInput] = useState('');

  //TODO: save selected user name for each room to cookie
  return (
    <div>
      <div>Select username:</div>
      {
      roomData.users.map((user) => {
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
