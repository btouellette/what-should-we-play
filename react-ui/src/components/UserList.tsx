import { IRoom } from "../../../server/models/room";

interface UserListProps {
  users: IRoom['users'];
}

const UserList = ({ users }: UserListProps) => {
  return (
    <>
    <h2>Who's here?</h2>
    <ul>
    {
      users.map((user) => (
        <li key={user}>{user}</li>
      ))
    }
    </ul>
    </>
  );
};

export default UserList;