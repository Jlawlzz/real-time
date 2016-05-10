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
thankYou.hide();

for (var i = 0; i < answers.length; i++) {
  answers[i].addEventListener('click', function(){
    socket.send('voteCast', {survey: surveyId, vote: this.innerText});
    survey.hide()
    thankYou.show()
  });
}
