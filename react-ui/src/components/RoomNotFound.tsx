import { IRoom } from "../../../server/models/room";

const RoomNotFound = ({ name }: { name: IRoom['name'] }) => {
  return <div>Could not find room: {name}</div>;
};
export default RoomNotFound;
