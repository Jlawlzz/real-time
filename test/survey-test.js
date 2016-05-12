'use strict'

let assert = require('chai').assert;
let Survey = require('../src/survey');

describe('survey functions', function(){
  it('saves passed in attributes', function(){
    let survey = new Survey( 1, 2, 3, { question: 4, answers: 5 }, 6 );

    assert.equal( survey.id, 1 )
    assert.equal( survey.privateId, 2 )
    assert.equal( survey.owner, 3 )
    assert.equal( survey.question, 4 )
    assert.equal( survey.answers, 5 )
    assert.equal( survey.expiration, 6 )
  });

  it('checks for true expire', function(){
    let survey = new Survey( 1, 2, 3, { question: 4, answers: 5 }, 6 );
    survey.createdAt = 100
    survey.checkExpiration()

    assert.equal( survey.status , 'closed' )
  });

  it('checks for false expire', function(){
    let survey = new Survey( 1, 2, 3, { question: 4, answers: 5 }, 6 );
    survey.createdAt = 100000000000000;
    survey.checkExpiration()

    assert.equal( survey.status , 'open' )
  });
});
