import {  useParams } from "react-router-dom";

const Room = () => {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { room } = useParams<Record<string, string>>();

  return (
    <div>
      <h3>ID: {room}</h3>
    </div>
  );
}

export default Room;
