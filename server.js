'use strict';

const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const SurveyEngine = require('./src/survey-engine');
const PathRouter = require('./src/path-router');
const SocketRouter = require('./src/socket-router');

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

      SocketRouter.voteCast(message, io);

    };

    if(channel === 'voteClose') {

      SocketRouter.voteClose(message, io);

    };
  });
});

app.use(express.static('public'));

app.get('/', function (req, res){
  PathRouter.getHome(req, res);
});

app.post('/admin', function (req, res) {
  PathRouter.postNewSurvey(req, res);
});

app.get('/survey/:id', function(req, res) {
  PathRouter.getPublicSurvey(req, res);
});

app.get('/survey/private/:id', function(req, res) {
  PathRouter.getPrivateSurvey(req, res);
});

app.get('/admin/:id', function(req, res) {
  PathRouter.getAdminDash(req, res);
});

app.get('/admin/links/:id', function(req, res){
  PathRouter.getAdminLinks(req, res);
});

module.exports = server;
