'use strict'

let assert = require('chai').assert;
let Survey = require('../src/survey');
let SurveyStore = require('../src/survey-store');
let SurveyEngine = require('../src/survey-engine');

describe('survey engine functions', function(){

  it('creates a survey id', function(){
    let id = SurveyEngine.createSurveyId();

    assert.equal( id.length, 20 );
  })

  it('creates admin id', function(){
    let id = SurveyEngine.createAdminId();

    assert.equal( id.length, 16 );
  })

  it('parses questions and answers', function(){
    let body = { survey: { question: 'hello', options: ['yolo'] } }
    let result = SurveyEngine.parseQuestions(body);

    assert.equal( result.question, 'hello' );
    assert.equal( Object.keys(result.answers)[0], 'yolo' );
  })

  it('parses answers to votes', function(){
    let options = ['yolo', 'noice', 'woopwoop'];
    let result = SurveyEngine.createVotes(options);

    assert.equal( result.yolo, 0 );
    assert.equal( result.woopwoop, 0 );
    assert.equal( result.noice, 0 );
  })

  it('parses present time', function(){
    let options = { survey: { time: 1 } }
    let result = SurveyEngine.parseTime(options);

    assert.equal( result, 60000 );
  })

  it('parses absent time', function(){
    let options = { survey: {question: 'hello'} }
    let result = SurveyEngine.parseTime(options);

    assert.equal( result, null );
  })

});
