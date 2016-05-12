'use strict';

const crypt = require('crypto');
const Survey = require('./survey');
const SurveyStore = require('./survey-store')

const SurveyEngine = {

  createSurvey(req, io){

    let publicId = this.createSurveyId();
    let privateId = this.createSurveyId();
    let adminId = this.createAdminId();
    let expiration = this.parseTime(req.body);
    let question = this.parseQuestions(req.body);

    if ( question['question'] && question['answers'] ){
      let survey = new Survey(publicId, privateId, adminId, question, expiration);
      SurveyStore.addSurvey(survey);
      return survey;

    } else {
      return null;

    }
  },

  createSurveyId(){
    return crypt.randomBytes(10).toString('hex');
  },

  createAdminId(){
    return crypt.randomBytes(8).toString('hex');
  },

  parseQuestions(body){
    return {'question': body.survey.question, 'answers': this.createVotes(body.survey.options)}
  },

  parseTime(body){
    if (body.survey.time){
      return (body.survey.time * 60 * 1000);
    } else {
      return null;
    }
  },

  createVotes(options){

    if(options.indexOf('') >= 0){
      return null;
    } else {
      let answers = {};
      options.forEach( option => { answers[option] = 0 });
      return answers;
    }
  }

}

module.exports = SurveyEngine;
