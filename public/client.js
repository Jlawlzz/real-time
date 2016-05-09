'use strict';

let socket = io();

let connectionCount = document.getElementById('connection-count');
let statusMessage = document.getElementById('status-message');
let votesDisplay = document.getElementById('votes-display');
let lastVote = document.getElementById('last-vote');
let createPoleButton = document.getElementById('create-poll')
let poleForm = document.getElementById('new-poll-form')
let buttons = document.querySelectorAll('#choices button');
let options = 4;

$(document).ready(function(){
  $('#new-poll-form').hide();
});

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function(){
    socket.send('voteCast', this.innerText);
  });
}

createPoleButton.addEventListener('click', function(){
  $('#new-poll-form').toggle()
})

$('#add-option').on('click', function(){
      options += 1;
      $('#options-list').append(
          `<div class="row">
            <div class="input-field">
              <label for="survey[options][]">Option ${options}</label>
              <input name="survey[options][]" type="text">
            </div>
          </div>`
      )
})

socket.on('usersConnected', function (count) {
  connectionCount.innerHTML = '<h5>Connected Users:' + count; + '</h5>'
});

socket.on('statusMessage', function(message) {
  statusMessage.innerText = message;
});

socket.on('voteCount', function(votes){
  votesDisplay.innerHTML = `<h4>current votes: A: ${votes['A']} - B: ${votes['B']} - C: ${votes['C']} - D: ${votes['D']}</h4>`
});

socket.on('lastVote', function(vote){
  lastVote.innerHTML = '<h4>Your last vote: ' + vote + '</h4>'
});
