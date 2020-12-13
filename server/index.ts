import * as express from 'express';
import * as path from 'path';
import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import generateName from './helper/nameGenerator';
import Room from './models/room'

// Read in any environment variables (used in development only)
dotenv.config({ path: `${__dirname}/.env` });

// Connect to the database
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
  console.log('Creating new room');
  let safetyValve = 10;

  (function createRoom() {
    const room = new Room({
      name: generateName()
    });
    room.save((err: any) => {
      if (err) {
        if (err.name === 'MongoError' && err.code === 11000) {
          // Room name already in use
          if (safetyValve-- <= 0) {
            console.error('Failed to create room due to safety valve');
            res.set('Content-Type', 'text/plain');
            res.status(500).send('Could not find unique room name');
          } else {
            createRoom()
          }
        } else {
          console.error(`Failed to create room: ${err}`);
          res.set('Content-Type', 'text/plain');
          res.status(500).send('Failed to create new room');
        }
      } else {
        console.log(`Created room: ${room.name}`);
        res.set('Content-Type', 'application/json');
        res.send(room.name);
      }
    });
  })();
});

app.get('/api/get-room', (req, res) => {

});

// All remaining requests return the React app, so it can handle routing.
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Node worker ${process.pid}: listening on port ${port}`);
});

// Log unhandled errors and restart
process.on('uncaughtException', (err) => {
  console.log(err);
  process.exit(1);
});