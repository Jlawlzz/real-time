"use strict"

const SurveyEngine = require('./survey-engine.js');
const SurveyStore = require('./survey-store.js')

const Router = {

  getHome(req, res){
    res.render('home');
  },

  getIndex(req, res){
    res.render('index');
  },

  getPublicSurvey(req, res){

    let survey = SurveyStore.getSurveyPublic(req.params.id);

    if(survey){
      res.render('render-survey-public', {survey: survey});
    } else {
      res.redirect('/');
    }

  },

  getPrivateSurvey(req, res){

    let survey = SurveyStore.getSurveyPrivate(req.params.id);

    if(survey){
      res.render('render-survey-private', {survey: survey});
    } else {
      res.redirect('/');
    }

  },

  getAdminDash(req, res){

    let survey = SurveyStore.getSurveyViaAdmin(req.params.id)

    if(survey){
      res.render('render-result', {survey: survey})
    } else {
      res.redirect('/')
    }
  },

  postNewSurvey(req, res, io){

    let survey = SurveyEngine.createSurvey(req, io);
    res.render('survey-links', {survey: survey});

  }



}

module.exports = Router;
