'use strict';

var nameSubmit = document.getElementById('home-form');
var nameInput;

function addName(event){
  event.preventDefault();
  nameInput = event.target.username.value;
  console.log('name input: ' + nameInput);
  localStorage.setItem('username', nameInput);
}


nameSubmit.addEventListener('submit', addName);
