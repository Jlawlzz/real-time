'use strict'

let Survey = function(id, owner, params){
  this.id = id;
  this.owner = owner;
  this.question = params.question;
  this.answers = params.answers;
}

module.exports = Survey;
