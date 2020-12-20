import React, { Dispatch, SetStateAction } from "react";
import { responseToJSON, logError } from "../helpers/responseHelpers";
import { IOption, IRoom } from "../../../server/models/room";
import './VotingOptionRow.css';

interface VotingOptionProps {
  option: IOption;
  userName: string;
  roomName: IRoom['name'];
  setRoomData: Dispatch<SetStateAction<IRoom | undefined>>;
}

const VotingOption = React.forwardRef<HTMLDivElement, VotingOptionProps>(({ option, userName, roomName, setRoomData }, ref) => {
  const optionIsVotedFor = option.userVotes.includes(userName);

  const updateOptionVote = () => {
    // Save to backend
    fetch('/api/change-vote?' + new URLSearchParams({ optionName: option.name, userName: userName, roomName: roomName, votedFor: (!optionIsVotedFor).toString() }), { method: 'POST' })
    .then(responseToJSON)
    .then((data: IRoom) => setRoomData(data))
    .catch(logError);
  };

  return (
    <div className="VotingOption" ref={ref}>
      <div className="VotingOption-votes">
        <div><i className={`far fa-caret-square-up ${optionIsVotedFor ? 'voted' : 'not-voted'}`} onClick={updateOptionVote}></i></div>
        <div><b>{option.userVotes.length}</b></div>
      </div>
      <div className="VotingOption-name">{option.name}</div>
    </div>
  );
});

export default VotingOption;
