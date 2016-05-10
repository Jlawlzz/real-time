"use strict";

let socket = io();

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
