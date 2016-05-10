'use strict'

let Survey = function(publicId, privateId, owner, params){
  this.id = publicId;
  this.privateId = privateId;
  this.owner = owner;
  this.question = params.question;
  this.answers = params.answers;
  this.status = "open";
}

module.exports = Survey;
