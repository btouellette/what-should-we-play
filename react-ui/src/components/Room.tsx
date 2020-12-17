import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import RoomNotFound from "./RoomNotFound";
import UserNameSelect from "./UserNameSelect";
import { responseToJSON, logError } from "../helpers/responseHelpers";
import { IRoom } from "../../../server/models/room";

const Room = () => {
  // Access the dynamic pieces of the URL
  let { roomName } = useParams<Record<string, string>>();
  const [roomData, setRoomData] = useState<IRoom | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    fetch('/api/get-room?' + new URLSearchParams({ name: roomName }), { method: 'GET' })
    .then(responseToJSON)
    .then((data: IRoom) => { setRoomData(data); })
    .catch(logError)
    .finally(() => { setLoading(false); });
  }, [roomName]);

  return loading   ? <Loading /> :
         !roomData ? <RoomNotFound roomName={roomName} /> :
         !userName ? <UserNameSelect roomData={roomData} setUserName={setUserName} /> :
    <div>
      <h3>Room: {roomName}</h3>
      <h3>User: {userName}</h3>
    </div>;
}

export default Room;
