// I am going to use express
const express = require('express');
const people = require('./people');
const path = require('path');

// Shorthand way of accessing express
const app = express();

const PORT = process.env.PORT || 8000;

// object of people
// A static folder to hold client-side files ie style.css + main.js
app.use(express.static(path.join(__dirname, 'public')));

// Pass in the end point
// app.get('/', (req, res) => {
//   Look locally and then navigate to the file
// res.sendFile(__dirname + '/index.html');
// });

// Listening for api calls - uses req.query
// http://localhost:8000/api?name=bob
app.get('/api', (req, res) => {
  const personName = req.query.name?.toLowerCase();
  if (people[personName]) {
    res.json(people[personName]);
  }
  res.json({ name: 'unknown' });
});

// Second way of doing it - uses req.params
// Colon means that it is a query parameter
// http://localhost:8000/api/bob
app.get('/api/:name', (req, res) => {
  // Optional chaining as may be no name
  const personName = req.params.name?.toLowerCase();
  // Send a json file
  res.json(people[personName]);
});

app.listen(PORT, () => {
  console.log(`Started server - http://localhost:${PORT}`);
});
