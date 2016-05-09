'use strict';

let store = {}

const SurveyStore = {

  addSurvey(survey){
    store[survey.id] = survey;
  }

}

module.exports = SurveyStore;
