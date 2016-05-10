'use strict';

let socket = io();

let connectionCount = document.getElementById('connection-count');
let statusMessage = document.getElementById('status-message');
let votesDisplay = document.getElementById('votes-display');
let lastVote = document.getElementById('last-vote');
let answers = document.querySelectorAll('.answers');
let surveyId = $('.survey').attr('id');
let survey = $('.survey');
let thankYou = $('#thank-you');

$(document).on('ready', function(){
  thankYou.hide();
  assessStatus();
})

for (var i = 0; i < answers.length; i++) {
  answers[i].addEventListener('click', function(){
    socket.send('voteCast', {survey: surveyId, vote: this.innerText});
    survey.hide()
    thankYou.show()
  });
}

socket.on('updateVote', function (survey) {
  if( survey.id == $('.survey').attr('id')){
    $('#results').html(renderResults(survey))
  }
});

socket.on('closeVote', function (survey) {
  if( survey.id == $('.survey').attr('id')){
    $('.survey-window').html('<h3>we are sorry, this survey has been closed by the administrator</h3>');
  }
});

function renderResults(survey){
  let newResults = ''
  for (var answer in survey.answers) {
    newResults = newResults + "<h4>" + answer + " votes: " + survey.answers[answer] +  "</h4></br>"
  }
  return newResults
}

function assessStatus(){
  if($('.survey-window').attr('id') === 'closed'){
    $('.survey-window').html('<h3>we are sorry, this survey has been closed by the administrator</h3>');
  }
}
