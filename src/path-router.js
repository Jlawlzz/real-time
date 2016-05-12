"use strict"

const SurveyEngine = require('./survey-engine.js');
const SurveyStore = require('./survey-store.js')

const PathRouter = {

  getHome(req, res){
    res.render('home');
  },

  getPublicSurvey(req, res){
    let survey = SurveyStore.getSurveyPublic(req.params.id);
    if(survey){
      survey.checkExpiration();
      res.render('render-survey-public', {survey: survey});
    } else {
      res.redirect('/');
    }
  },

  getPrivateSurvey(req, res){
    let survey = SurveyStore.getSurveyPrivate(req.params.id);
    if(survey){
      survey.checkExpiration();
      res.render('render-survey-private', {survey: survey});
    } else {
      res.redirect('/');
    }
  },

  getAdminDash(req, res){
    let survey = SurveyStore.getSurveyViaAdmin(req.params.id)
    if(survey){
      survey.checkExpiration();
      res.render('render-result', {survey: survey})
    } else {
      res.redirect('/');
    }
  },

  postNewSurvey(req, res){
    let survey = SurveyEngine.createSurvey(req);
    if(survey){
      res.redirect('/admin/links/' + survey.id);
    } else {
      res.redirect('/');
    }
  },

  getAdminLinks(req, res){
    let survey = SurveyStore.getSurveyPublic(req.url.split('/')[3]);
    if(survey){
      survey.checkExpiration();
      res.render('render-survey-links', { survey: survey } );
    } else {
      res.redirect('/');
    }
  }

}

module.exports = PathRouter;
