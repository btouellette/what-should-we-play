import * as express from 'express';
import * as path from 'path';
import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';

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
app.get('/api/exists/:room', function (req, res) {
  const room = req.params.room;
  res.set('Content-Type', 'application/json');
  res.send(false);
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.listen(port, function () {
  console.log(`Node worker ${process.pid}: listening on port ${port}`);
});

// Log unhandled errors and restart
process.on('uncaughtException', function (err) {
  console.log(err);
  process.exit(1);
});