'use strict';

const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const countVotes = require('./src/count-votes.js');
const SurveyEngine = require('./src/survey-engine.js');

const app = express();
let port = process.env.PORT || 3000;
let votes = {};

let server = http.createServer(app)
                 .listen(port, function() {
                   console.log('Listening on port' + port + '.');
                 });

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));


const socketIo = require('socket.io');
const io = socketIo(server);

io.on('connection', function(socket) {
  console.log('A user has connected.', io.engine.clientsCount);

  io.sockets.emit('usersConnected', io.engine.clientsCount);

  socket.emit('statusMessage', 'You have connected');

  socket.on('disconnect', function () {
    console.log('A user has disconected', io.engine.clientsCount);
    delete votes[socket.id];
    console.log(votes);
    io.sockets.emit('userConnection', io.engine.clientsCount);
  });

  socket.on('message', function(channel, message){
    if(channel === 'voteCast') {
      socket.emit('lastVote', message);
      votes[socket.id] = message;
      io.sockets.emit('voteCount', countVotes(votes));
    };
  });
});

app.use(express.static('public'));

app.get('/', function (req, res){
  res.render('home');
});

app.get('/vote', function (req, res){
  res.render('index');
});

app.post('/admin', function (req, res) {
  SurveyEngine.createSurvey(req, io);
});

module.exports = server;
