'use strict'

let Survey = function(publicId, privateId, owner, params, expiration, timeNow){
  let time = new Date();

  this.id = publicId;
  this.privateId = privateId;
  this.owner = owner;
  this.question = params.question;
  this.answers = params.answers;
  this.status = "open";
  this.expiration = expiration;
  this.createdAt = time.getTime();
}

Survey.prototype.checkExpiration = function(){
  let time = new Date();
  if(this.expiration != null && ((time.getTime() - this.createdAt) >= this.expiration)){
    console.log('here')
    this.status = 'closed';
  }
}

module.exports = Survey;
