"use strict";

let socket = io();

$('#close').on('click', function(){
  socket.send('voteClose', $('.survey').attr('id'));
});

socket.on('updateVote', function (survey) {
  if( survey.id == $('.survey').attr('id')){
    $('#results').html(renderResults(survey))
  }
});

function renderResults(survey){
  let newResults = ''
  for (var answer in survey.answers) {
    newResults = newResults + "<h4>" + answer + " votes: " + survey.answers[answer] +  "</h4></br>"
  }
  console.log(newResults)
  return newResults
}
