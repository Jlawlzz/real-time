'use strict';

const crypt = require('crypto');
const Survey = require('./survey');
const SurveyStore = require('./survey-store')

const SurveyEngine = {

  createSurvey(req, io){

    let surveyId = this.createSurveyId();
    let adminId = this.createAdminId();
    let questions = this.parseQuestions(req.body);

    let survey = new Survey(surveyId, adminId, questions);

    SurveyStore.addSurvey(survey);

    return survey
  },

  createSurveyId(){
    return crypt.randomBytes(10).toString('hex');
  },

  createAdminId(){
    return crypt.randomBytes(8).toString('hex');
  },

  parseQuestions(body){
    return {'question': body.survey.question, 'answers': body.survey.options}
  }

}

module.exports = SurveyEngine;
