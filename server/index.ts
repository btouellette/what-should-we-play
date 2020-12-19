import * as express from 'express';
import * as path from 'path';
import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import log from 'loglevel';
import * as API from './api';

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
app.post('/api/create-room', API.createRoom);
app.get('/api/get-room', API.getRoom);
app.post('/api/add-option', API.addOption);

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