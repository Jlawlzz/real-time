"use-strict";

let Survey = require('./survey');

let simpleCrypt = require('simple-crypt').Crypt;

let SurveyEngine = {

  createSurvey(req, io){

    let surveyId = this.createSurveyId();
    let adminId = this.createAdminId();
    let questions = this.parseQuestions()

    survey = new Survey(surveyId, adminId, questions);
  },

  createSurveyId(){
    getId(10);
  },

  createAdminId(){
    getId(8)
  },

  parseQuestions(){

  }

}

function getId(size){
  Crypt.make(crypto.randomBytes(), function (err, encrypter){
    return encrypter
  });
};


module.exports = SurveyEngine;
