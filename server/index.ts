import * as express from 'express';
import * as path from 'path';

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