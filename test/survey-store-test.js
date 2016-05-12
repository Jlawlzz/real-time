'use strict'

let assert = require('chai').assert;
let Survey = require('../src/survey');
let SurveyStore = require('../src/survey-store');
let SurveyEngine = require('../src/survey-engine');

describe('survey store functions', function(){

  it('can add survey', function(){
    let survey = new Survey( 1, 2, 3, { question: 4, answers: 5 }, 6 );

    SurveyStore.addSurvey(survey);

    assert.equal( SurveyStore.getSurveyPublic(1).id, 1 );
  })

  it('can get proper public survey', function(){
    let survey = new Survey( 1, 2, 3, { question: 4, answers: 5 }, 6 );
    let survey2 = new Survey( 2, 2, 3, { question: 4, answers: 5 }, 6 );

    SurveyStore.addSurvey(survey);
    SurveyStore.addSurvey(survey2);

    assert.equal( SurveyStore.getSurveyPublic(2).id, 2 );
  })

  it('can get proper private survey', function(){
    let survey = new Survey( 1, 2, 3, { question: 4, answers: 5 }, 6 );
    let survey2 = new Survey( 2, 3, 3, { question: 4, answers: 5 }, 6 );

    SurveyStore.addSurvey(survey);
    SurveyStore.addSurvey(survey2);

    assert.equal( SurveyStore.getSurveyPrivate(3).id, 2 );
  })

  it('can get proper admin survey', function(){
    let survey = new Survey( 1, 2, 3, { question: 4, answers: 5 }, 6 );
    let survey2 = new Survey( 2, 3, 4, { question: 4, answers: 5 }, 6 );

    SurveyStore.addSurvey(survey);
    SurveyStore.addSurvey(survey2);

    assert.equal( SurveyStore.getSurveyViaAdmin(4).id, 2 );
  })

});
