"use strict";

let createPoleButton = document.getElementById('create-poll')
let poleForm = document.getElementById('new-poll-form')
let options = 2 ;

$(document).ready(function(){
  $('#new-poll-form').hide();
});

createPoleButton.addEventListener('click', function(){
  $('#new-poll-form').toggle()
});

$('#add-option').on('click', function(){
  console.log('here')
      options += 1;
      $('.options-list').append(
          `<div class="row">
            <div class="input-field">
              <label for="survey[options][]">Option ${options}</label>
              <input name="survey[options][]" type="text" class="form-control">
            </div>
          </div>`
      )
});
