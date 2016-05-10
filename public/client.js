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
})

for (var i = 0; i < answers.length; i++) {
  answers[i].addEventListener('click', function(){
    socket.send('voteCast', {survey: surveyId, vote: this.innerText});
    survey.hide()
    thankYou.show()
  });
}

socket.on('updateVote', function (survey) {
  $('#results').html(renderResults(survey))
});

function renderResults(survey){
  let newResults = ''
  for (var answer in survey.answers) {
    newResults = newResults + "<h4>" + answer + " votes: " + survey.answers[answer] +  "</h4></br>"
  }
  console.log(newResults)
  return newResults
}
