import { IOption } from "../../../server/models/room";

const VotingOption = ({ option, userName }: { option: IOption, userName: string}) => {
  return (
    <div>
      <div>{option.name}</div>
    </div>
  );
}

export default VotingOption;
