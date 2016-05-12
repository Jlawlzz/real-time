"use strict"

const SurveyEngine = require('./survey-engine.js');
const SurveyStore = require('./survey-store.js')

const SocketRouter = {

  voteCast(message, io){

    let survey = SurveyStore.getSurveyPublic(message.survey);

    survey.checkExpiration();

    if (survey.status === 'open') {
      this.emitCastVote(survey, message, io);

    } else {
      this.emitCloseVote(survey, io);

    }
  },

  voteClose(message, io){

    let survey = SurveyStore.getSurveyPublic(message);

    survey.checkExpiration();

    this.emitCloseVote(survey, io);

  },

  emitCastVote(survey, message, io){
    survey.answers[message.vote] += 1;
    io.sockets.emit('updateVote', survey);
  },

  emitCloseVote(survey, io){
    survey.status = 'closed';
    io.sockets.emit('closeVote', survey);
  },

}

module.exports = SocketRouter;
