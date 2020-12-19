import { Dispatch, SetStateAction } from "react";
import { IOption, IRoom } from "../../../server/models/room";
import './VotingOption.css';

interface VotingOptionProps {
  option: IOption;
  userName: string;
  roomName: IRoom['name'];
  setRoomData: Dispatch<SetStateAction<IRoom | undefined>>;
}


const VotingOption = ({ option, userName, roomName, setRoomData }: VotingOptionProps) => {
  const optionIsVotedFor = option.userVotes.includes(userName);
  const updateOptionVote = () => {

  };

  return (
    <li>
      <i className={`fa-li far fa-caret-square-up ${optionIsVotedFor ? 'voted' : 'not-voted'}`} onClick={updateOptionVote}></i>{option.name}
    </li>
  );
}

export default VotingOption;
