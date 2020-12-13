import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toJSON, logError } from "../helpers/promiseHelpers";
import { IRoom } from "../../../server/models/room"

const Room = () => {
  const [room, setRoom] = useState({});

  useEffect(() => {
    fetch('/api/get-room', { method: 'GET' })
    .then(toJSON)
    .then((data: IRoom) => {  })
    .catch(logError)
    .finally(() => {  });
  });
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { roomName } = useParams<Record<string, string>>();

  return (
    <div>
      <h3>ID: {roomName}</h3>
    </div>
  );
}

export default Room;
