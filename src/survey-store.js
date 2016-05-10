'use strict';

let store = {}
console.log('newStore')
const SurveyStore = {

  addSurvey(survey){
    store[survey.id] = survey;
  },

  getSurvey(id){
    return store[id];
  },

  getSurveyViaAdmin(id){
    for (var survey in store) {
      if (store[survey].owner === id){ return store[survey] }
    }
  }
}

module.exports = SurveyStore;
