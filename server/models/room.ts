import * as mongoose from 'mongoose';

export interface IOption {
  name: string;
  userVotes: string[];
}

export interface IRoom extends mongoose.Document {
  name: string;
  users: string[];
  options: IOption[];
}

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  users: [String],
  options: [{
    name: String,
    userVotes: [String] // List of users who voted for this option
  }]
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

export default mongoose.model<IRoom>('Room', roomSchema);