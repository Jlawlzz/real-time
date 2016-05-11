'use strict';

const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const countVotes = require('./src/count-votes.js');
const SurveyEngine = require('./src/survey-engine.js');
const SurveyStore = require('./src/survey-store.js')
const Router = require('./src/router.js')

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

  socket.on('message', function(channel, message){
    if(channel === 'voteCast') {
      let survey = SurveyStore.getSurveyPublic(message.survey);
      survey.checkExpiration();
      if (survey.status === 'open') {
        survey.answers[message.vote] += 1;
        io.sockets.emit('updateVote', survey);
      } else {
        survey.status = 'closed'
        io.sockets.emit('closeVote', survey);
      }
    };

    if(channel === 'voteClose') {
      let survey = SurveyStore.getSurveyPublic(message);
      survey.status = 'closed'
      io.sockets.emit('closeVote', survey);
    };
  });
});

app.use(express.static('public'));

app.get('/', function (req, res){
  Router.getHome(req, res);
});

app.post('/admin', function (req, res) {
  Router.postNewSurvey(req, res, io)
});

app.get('/survey/:id', function(req, res) {
  Router.getPublicSurvey(req, res);
});

app.get('/survey/private/:id', function(req, res) {
  Router.getPrivateSurvey(req, res);
});

app.get('/admin/:id', function(req, res) {
  Router.getAdminDash(req, res)
});

module.exports = server;
