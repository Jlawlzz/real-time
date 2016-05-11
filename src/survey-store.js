'use strict';

let store = {}
console.log('newStore')
const SurveyStore = {

  addSurvey(survey){
    store[survey.id] = survey;
  },

  getSurveyPublic(id){
    return store[id];
  },

  getSurveyPrivate(id){
    for (var survey in store) {
      if (store[survey].privateId === id){ return store[survey] }
    }
  },

  getSurveyViaAdmin(id){
    for (var survey in store) {
      if (store[survey].owner === id){ return store[survey] }
    }
  }

}

module.exports = SurveyStore;
