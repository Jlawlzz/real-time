'use strict';

let store = {}
console.log('newStore')
const SurveyStore = {

  addSurvey(survey){
    store[survey.id] = survey;
  },

  getSurvey(id){
    return store[id];
  }
}

module.exports = SurveyStore;
