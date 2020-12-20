import { Request, Response } from 'express';
import log from 'loglevel';
import generateName from './helper/nameGenerator';
import Room from './models/room';

// Create a new room an dreturn the room name as a string
export const createRoom = (req: Request, res: Response) => {
  log.debug('Creating new room');
  // How many retries on name generation before giving up (currently 1500*1500*1728 possible room names)
  let safetyValve = 3;

  (async function createRoom() {
    // Generate new named room and attempt to save to data store
    const room = new Room({
      name: generateName()
    });
    try {
      await room.save();
      // Successfully created room, return it to front end
      log.debug(`Created room: ${room.name}`);
      res.set('Content-Type', 'application/json');
      res.send(room.name);
    } catch (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
        // Room name already in use, retry name generation up to limit
        if (safetyValve-- <= 0) {
          log.error('Failed to create room due to safety valve');
          res.set('Content-Type', 'text/plain');
          res.status(500).send('Could not find unique room name');
        } else {
          createRoom()
        }
      } else {
        // Unknown error occurred
        log.error(`Failed to create room: ${err}`);
        res.set('Content-Type', 'text/plain');
        res.status(500).send('Failed to create new room');
      }
    }
  })();
};

// Fetch data for a specific room returned as JSON
export const getRoom = async (req: Request, res: Response) => {
  const roomName = req.query.name as string;
  log.debug(`Getting room: ${roomName}`);
  try {
    let roomData = await Room.findOne({ name: roomName });
    // Found room in data store, return it to front end
    res.set('Content-Type', 'application/json');
    res.send(roomData);
  } catch (err) {
    // Error occurred fetching room, possibly one does not exist with this name
    log.error(`Failed to find room ${roomName}: ${err}`);
    res.set('Content-Type', 'text/plain');
    res.status(500).send('Failed to find room');
  }
};

// Add a new user to a specific room returning new room data as JSON
export const addUser = async (req: Request, res: Response) => {
  const roomName = req.query.roomName as string;
  const userName = req.query.userName as string;
  log.debug(`Adding user to room ${roomName}: ${userName}`);
  try {
    // Don't add this user if there is already one by this name
    const filter = { name: roomName };
    const update = { $addToSet: { users: userName } };
    let roomData = await Room.findOneAndUpdate(filter, update, { new: true });
    res.set('Content-Type', 'application/json');
    res.send(roomData);
  } catch (err) {
    log.error(`Failed to add option: ${err}`);
    res.status(500).send('Failed to add option');
  }
};

// Add a new voting option to a specific room returning new room data as JSON
export const addOption = async (req: Request, res: Response) => {
  const roomName = req.query.roomName as string;
  const userName = req.query.userName as string;
  const optionName = req.query.optionName as string;
  log.debug(`Adding option to room ${roomName}: ${optionName}`);
  try {
    // Don't add this option if there is already one by this name
    const filter = {
      name: roomName,
      'options.name': { $ne: optionName }
    };
    // Push the new option to the array with the requesting user as the only vote
    const update = {
      $push: {
        options: {
          name: optionName,
          userVotes: [userName]
        }
      }
    };
    let roomData = await Room.findOneAndUpdate(filter, update, { new: true });
    res.set('Content-Type', 'application/json');
    res.send(roomData);
  } catch (err) {
    log.error(`Failed to add option: ${err}`);
    res.status(500).send('Failed to add option');
  }
};

export const changeVote = async (req: Request, res: Response) => {
  const roomName = req.query.roomName as string;
  const userName = req.query.userName as string;
  const optionName = req.query.optionName as string;
  const votedFor = (req.query.votedFor as string === 'true');
  log.debug(`Changing vote in room ${roomName}: ${optionName}`);
  try {
    const filter = {
      name: roomName,
      'options.name': optionName
    };
    // Push the new option to the array with the requesting user as the only vote
    const update = votedFor ? {
      $addToSet: {
        'options.$.userVotes': userName
      }
    } : {
      $pull: {
        'options.$.userVotes': userName
      }
    };
    let roomData = await Room.findOneAndUpdate(filter, update, { new: true });
    res.set('Content-Type', 'application/json');
    res.send(roomData);
  } catch (err) {
    log.error(`Failed to add option: ${err}`);
    res.status(500).send('Failed to add option');
  }
};

// Unexposed API to delete room entirely
export const removeRoom = async (roomName: string) => {
  log.debug(`Deleting room: ${roomName}`);
  try {
    await Room.findOneAndDelete({name: roomName});
  } catch (err) {
    log.error(`Failed to delete room ${roomName}: ${err}`);
  }
}