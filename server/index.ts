import * as express from 'express';
import * as path from 'path';
import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import log from 'loglevel';
import generateName from './helper/nameGenerator';
import Room from './models/room'

// Read in any environment variables (used in development only)
dotenv.config({ path: `${__dirname}/.env` });

// Connect to the database with options necessary to prevent deprecation warnings in mongoose
const mongooseOptions = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
};
const mongooseURL = process.env.MONGO_URL || 'mongodb://localhost/wswp_db';
mongoose.connect(mongooseURL, mongooseOptions);

// Create a new express application instance
const app = express();
const port = process.env.PORT || 3080;

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

// Answer API requests.
app.post('/api/create-room', (req, res) => {
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
});

app.get('/api/get-room', (req, res) => {
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
});

app.post('/api/add-option', (req, res) => {
  Room.findOneAndUpdate({ name: req.query.name as string })
  .then((room) => {

  });
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.listen(port, () => {
  log.debug(`Node worker ${process.pid}: listening on port ${port}`);
});

// Log unhandled errors and restart
process.on('uncaughtException', (err) => {
  log.debug(err);
  process.exit(1);
});