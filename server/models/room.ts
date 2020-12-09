import * as mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  roomName: { type: String, unique: true },
  users: [String],
  options: [{
    optionName: String,
    userVotes: [String] // List of users who voted for this option
  }]
});

export default mongoose.model('Room', roomSchema);