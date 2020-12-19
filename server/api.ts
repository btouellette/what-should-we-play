import { Request, Response } from 'express';
import log from 'loglevel';
import generateName from './helper/nameGenerator';
import Room from './models/room';

export const createRoom = (req: Request, res: Response) => {
  log.debug('Creating new room');
  // How many retries on name generation before giving up (currently 1500*1500*1728 possible room names)
  let safetyValve = 10;

  (function createRoom() {
    // Generate new named room and attempt to save to data store
    const room = new Room({
      name: generateName()
    });
    room.save((err: any) => {
      if (err) {
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
      } else {
        // Successfully created room, return it to front end
        log.debug(`Created room: ${room.name}`);
        res.set('Content-Type', 'application/json');
        res.send(room.name);
      }
    });
  })();
};

export const getRoom = (req: Request, res: Response) => {
  Room.findOne({ name: req.query.name as string })
  .then((room) => {
    if (room) {
      // Found room in data store, return it to front end
      res.set('Content-Type', 'application/json');
      res.send(room);
    } else {
      // Unknown error occurred fetching room, possibly one does not exist with this name
      log.error(`Failed to find room: ${req.query.name}`);
      res.set('Content-Type', 'text/plain');
      res.status(500).send('Failed to find room');
    }
  });
};

export const addOption = (req: Request, res: Response) => {
  Room.findOneAndUpdate({ name: req.query.name as string })
  .then((room) => {

  });
};