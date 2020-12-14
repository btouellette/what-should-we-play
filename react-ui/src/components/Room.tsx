import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { responseToJSON, logError } from "../helpers/promiseHelpers";
import { IRoom } from "../../../server/models/room";

const Room = () => {
  // Access the dynamic pieces of the URL
  let { roomName } = useParams<Record<string, string>>();
  const [roomData, setRoomData] = useState<IRoom | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/get-room?' + new URLSearchParams({ name: roomName }), { method: 'GET' })
    .then(responseToJSON)
    .then((data: IRoom) => { setRoomData(data); })
    .catch(logError)
    .finally(() => { setLoading(false); });
  }, [roomName]);

  return (
    (loading ?
      <div>Loading</div>
        :
      (!roomData ?
        <div>Could not find room: {roomName}</div>
          :
        <div>
          <h3>ID: {roomName}</h3>
        </div>
      )
    )
  );
}

export default Room;
